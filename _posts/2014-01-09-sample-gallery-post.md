---
layout: post
type: photo
title: "Sample Gallery Post"
description: "Examples and code for displaying galleries in posts."
category: photos
tags: [sample post, images, gallery, test]
imagefeature: picture-16.jpg
comments: true
mathjax: 
---
Here is an example of what a post with a gallery might look like. If you want to display two or three images next to each other responsively use `figure` with the appropriate `class`. Each instance of `figure` is auto-numbered and displayed in the caption.

<figure class="third">
	<a href="{{ site.url }}/images/gallery1/photo (4).jpg"><img src="{{ site.url }}/images/gallery1/photo (3).jpg"></a>
	<a href="{{ site.url }}/images/gallery1/photo (18).jpg"><img src="{{ site.url }}/images/gallery1/photo (17).jpg"></a>
	<a href="{{ site.url }}/images/gallery1/photo (10).jpg"><img src="{{ site.url }}/images/gallery1/photo (9).jpg"></a>
</figure>
<figure class="half">
	<a href="{{ site.url }}/images/gallery1/photo (6).jpg"><img src="{{ site.url }}/images/gallery1/photo (5).jpg"></a>
	<a href="{{ site.url }}/images/gallery1/photo (12).jpg"><img src="{{ site.url }}/images/gallery1/photo (11).jpg"></a>
</figure>
<figure>
	<a href="{{ site.url }}/images/gallery1/photo (16).jpg"><img src="{{ site.url }}/images/gallery1/photo (16).jpg"></a>
</figure>
<figure class="half">
	<a href="{{ site.url }}/images/gallery1/photo (14).jpg"><img src="{{ site.url }}/images/gallery1/photo (13).jpg"></a>
	<a href="{{ site.url }}/images/gallery1/photo (20).jpg"><img src="{{ site.url }}/images/gallery1/photo (19).jpg"></a>
</figure>
<figure class="third">
	<a href="{{ site.url }}/images/gallery1/photo (22).jpg"><img src="{{ site.url }}/images/gallery1/photo (21).jpg"></a>
	<a href="{{ site.url }}/images/gallery1/photo (24).jpg"><img src="{{ site.url }}/images/gallery1/photo (23).jpg"></a>
	<a href="{{ site.url }}/images/gallery1/photo (74).jpg"><img src="{{ site.url }}/images/gallery1/photo (73).jpg"></a>
	<figcaption>Photos from my Japan trip.</figcaption>
</figure>