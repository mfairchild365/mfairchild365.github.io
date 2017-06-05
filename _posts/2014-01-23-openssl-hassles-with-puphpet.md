---
layout: post
title: "Openssl hassles with PuPHPet"
description: ""
category: 
tags: [openssl, puphpet]
---

Over the past few days I have been working on setting up Vagrant for a project of mine.  Our team works on many projects and we are in the process of rolling out a new template to over 22 of them.  We have some new designers that are tasked with converting these projects, so I thought it would be great to get Vagrant set up so that all they would have to do is `vagrant up` to get the project up and running.

I created a vagrant machine with [PuPHPet](https://puphpet.com/) using ubuntu and PHP 5.4, and everything seemed to be working great.  Then I tried to log in and got this error:

```
Unable to connect to ssl://*****:443. Error: stream_socket_client(): unable to connect to ssl://*****:443 (Unknown error) stream_socket_client(): Failed to enable crypto stream_socket_client(): SSL operation failed with code 1. OpenSSL Error messages: error:14090086:SSL routines:SSL3_GET_SERVER_CERTIFICATE:certificate verify failed
```

It was working just fine on my MAC, so why am I getting this error now?  After much delving, I found that it was an issue with PHP, openssl and Debian/Ubuntu systems.

It boils down to this:
On Debian/Ubuntu systems, openssl does not know where to look for certificates to verify the connection by default.  You have to manually specify the directory with the `capath` option.

The means that code like this will fail:

```
$fh = fopen('https://api.github.com/rate_limit', 'r', false, stream_context_create(array(
    'http' => array(
        'method' => 'GET',
        'header' => "Accept: application/json\r\nContent-type: application/json\r\n",
        'ignore_errors' => true,
    ),
    'ssl' => array('verify_peer' => true)
)));
```

and code like this will pass:

```
$fh = fopen('https://api.github.com/rate_limit', 'r', false, stream_context_create(array(
    'http' => array(
        'method' => 'GET',
        'header' => "Accept: application/json\r\nContent-type: application/json\r\n",
        'ignore_errors' => true,
    ),
    'ssl' => array(
        'verify_peer' => true,
        'capath' => '/etc/ssl/certs'
    )
)));
```

Because the `capath` might be different depending on what operating system you are using, its not a good idea to hard code this in a library.
It also looks like this will be fixed in PHP 5.6 ([source](https://wiki.php.net/rfc/tls-peer-verification))

I was using a library called [simpleCAS](https://github.com/saltybeagle/simplecas) to authenticate users.  The library uses the PEAR library [HTTP_Request2](http://pear.php.net/package/HTTP_Request2/) to send http requests.  HTTP_Request2 by default uses a PHP socket to make these requests.  Rather than hard coding a `capath` I decided it would be better to just use curl, which include a `capath` by default.

So now my simpleCAS code looks like:

```
$options = array(
    'hostname' => '*****',
    'port' => 443,
    'uri' => 'cas'
);

$protocol = new \SimpleCAS_Protocol_Version2($options);

$request = new \HTTP_Request2();
$request->setConfig('adapter', 'HTTP_Request2_Adapter_Curl');
$protocol->setRequest($request);

$client = \SimpleCAS::client($protocol);
```

If anyone knows of a better fix, let me know!


#sidenotes

While investigating this problem, I discovered the following interesting things.

To use openssl to verify a connection:

```
openssl s_client -connect www.google.com:443 -CApath /etc/ssl/certs
```

This fails if you do not specify a `CApath`

```
openssl s_client -connect www.google.com:443
```

Interestingly enough, it passes if you include a bogus `CApath`.  Which implies that openssl will only include the default `CApath` if you specify ANY `CApath`

```
openssl s_client -connect www.google.com:443 -CApath bogus
```

To find out where your openssl configuration file is you can look at the output of strace and search for .cnf

```
strace -o out.txt openssl s_client -connect www.google.com:443
cat out.txt | grep ".cnf"
```

To find the default install path for openssl, use

```
openssl version -d
```

This will output something like `/usr/lib/ssl`.  The certs directory for `capath` would be `/usr/lib/ssl/certs`.  On my ubuntu install, `/usr/lib/ssl/certs` was a symlink for `/etc/ssl/certs`

sources
* [https://wiki.php.net/rfc/tls-peer-verification](https://wiki.php.net/rfc/tls-peer-verification)
* [http://www.serverphorums.com/read.php?7,569662](http://www.serverphorums.com/read.php?7,569662)

