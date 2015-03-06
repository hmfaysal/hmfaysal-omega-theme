---
layout: post
title: "Theme Elements"
description: Theme Elements will save you tons of time working on the site content. Now you'll be able to create complex layouts within minutes.
category: Theme-Setup
headline: Discover the theme elements
tags: [Jekyll, HMFAYSAL OMEGA]
imagefeature: picture-38.jpg
comments: true
mathjax: true
---
I've put together a little post to introduce you to the HMFAYSAL OMEGA theme and get you started with Markdown. Go ahead and edit this post to get going and learn how it all works!

<section>
  <header>
    <h1 >Elements</h1>
  </header>
<div id="drawer" markdown="1">
*  Auto generated table of contents
{:toc}
</div>
</section>

# ELEMENTS

Writing in markdown is really easy. In any editor like notepad, you simply write as you normally would. Where appropriate, you can use formatting shortcuts to style your content. 

## LISTS

For example, a list:

- Item number one
- Item number two
	- A nested item
- A final item

or with numbers!

1. Remember to buy some milk
1. Drink the milk
1. Tweet that I remembered to buy the milk, and drank it

## LINKS

Want to link to a source? No problem. If you put the url in this format, like `[http://alum.mit.edu/www/hmfaysal](http://alum.mit.edu/www/hmfaysal)` - it'll automatically be linked up like [http://alum.mit.edu/www/hmfaysal](http://alum.mit.edu/www/hmfaysal). But if you want to customize your anchor text, you can do that too! Here's a link to the [my website](http://alum.mit.edu/www/hmfaysal "HMFAYSAL's Blog"). Neat.

## WHAT ABOUT IMAGES? ##

Images work too! And they are responsive! Already know the URL of the image you want to include in your article? Images are responsive and uses lightbox. 

<figure>
	<a href="{{ site.url }}/images/gallery1/photo (16).jpg"><img src="{{ site.url }}/images/gallery1/photo (16).jpg"></a>
</figure>
<figure class="half">
	<a href="{{ site.url }}/images/gallery1/photo (14).jpg"><img src="{{ site.url }}/images/gallery1/photo (13).jpg"></a>
	<a href="{{ site.url }}/images/gallery1/photo (20).jpg"><img src="{{ site.url }}/images/gallery1/photo (19).jpg"></a>
</figure>

Check out [this post]({{ site.url }}/articles/sample-post-images/) to learn about including images in your post.

## AND VIDEOS? ##

Video embeds are responsive and scale with the width of the main content block with the help of [FitVids](http://fitvidsjs.com/).

## EQUATIONS

Are you an engineer? Or a mathematician? Want to post some equations in your Jekyll blog for the world to see? No problem. HMFAYSAL OMEGA has MathJax built in to beautifully render your equations in the browser. To use MathJax simply turn on the MathJax feature by declaring in the Front YAML Matter like `mathjax: true`, then wrapping your equation between `$$...$$` will produce something like this:

<math display="block">
  <mstyle>
    <mi>f</mi>
    <mrow>
      <mo>(</mo>
      <mi>a</mi>
      <mo>)</mo>
    </mrow>
    <mo>=</mo>
 <mfrac>
        <mn>1</mn>
        <mrow>
          <mn>2</mn>
          <mi>π<!-- π --></mi>
          <mi>i</mi>
        </mrow>
      </mfrac>
    <msub>
      <mo>∮</mo>
      <mrow>
        <mi>γ</mi>
      </mrow>
    </msub>
    <mfrac>
      <mrow>
        <mi>f</mi>
        <mo>(</mo>
        <mi>z</mi>
        <mo>)</mo>
      </mrow>
      <mrow>
        <mi>z</mi>
        <mo>−</mo>
        <mi>a</mi>
      </mrow>
    </mfrac>
    <mi>d</mi>
    <mi>z</mi>
  </mstyle>
</math>

## THE LOGO ##

Not sure which image you want to use yet? That's ok too. Leave yourself a descriptive placeholder and keep writing. Come back later and change the image in the _config.yml.

## ICONS

This theme includes over 360 fontawesome icons. To use an icon go to [Fontawesome](http://fontawesome.io/3.2.1/icons/) website and click on the desired icon to find the appropriate tag.

<div class="text-center">
<i class="icon-cogs"></i> <i class="icon-youtube-sign"></i> <i class="icon-thumbs-up"></i> <i class="icon-coffee"></i> <i class="icon-cloud-upload"></i> <i class="icon-camera"></i> <i class="icon-comments-alt"></i> <i class="icon-eye-open"></i> <i class="icon-heart"></i> <i class="icon-globe"></i>
</div>

## QUOTING ##

Sometimes a link isn't enough, you want to quote someone on what they've said. It was probably very wisdomous. Is wisdomous a word? Find out in a future release when I introduce spellcheck! For now - it's definitely a word.

> Wisdomous - it's definitely a word.
><small><cite title="Hossain Mohd Faysal">Hossain Mohd Faysal</cite></small>

## WORKING WITH CODE ##

Got a streak of geek? We've got you covered there, too. You can write inline `<code>` blocks really easily with back ticks. Want to show off something more comprehensive? 4 spaces of indentation gets you there.

{% highlight css %}
.awesome-thing {
    display: block;
    width: 100%;
}
{% endhighlight %}

Learn more about syntax highlighting [in this post]({{ site.url }}/articles/code-highlighting-post/).

## READY FOR A BREAK? ##

Throw 4 or more dashes down on any new line and you've got yourself a fancy new divider. Aw yeah.

----

## FANCY SOME COLUMNS?


<div class="col-md-6">  
<p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum velit quis magna iaculis lacinia. Aenean sed nisi condimentum, placerat eros sit amet, lacinia purus. Ut sed euismod mauris. Morbi vitae diam quis diam egestas scelerisque a a ipsum.</p>  
</div>  

<div class="col-md-6">  
<p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum velit quis magna iaculis lacinia. Aenean sed nisi condimentum, placerat eros sit amet, lacinia purus. Ut sed euismod mauris. Morbi vitae diam quis diam egestas scelerisque a a ipsum.</p>  
</div> 
<br>  

<div class="col-md-4">  
<p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum velit quis magna iaculis lacinia. Aenean sed nisi condimentum, placerat eros sit amet, lacinia purus. Ut sed euismod mauris. Morbi vitae diam quis diam egestas scelerisque a a ipsum.</p>  
</div>  

<div class="col-md-4">  
<p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum velit quis magna iaculis lacinia. Aenean sed nisi condimentum, placerat eros sit amet, lacinia purus. Ut sed euismod mauris. Morbi vitae diam quis diam egestas scelerisque a a ipsum.</p>  
</div>  

<div class="col-md-4">  
<p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum velit quis magna iaculis lacinia. Aenean sed nisi condimentum, placerat eros sit amet, lacinia purus. Ut sed euismod mauris. Morbi vitae diam quis diam egestas scelerisque a a ipsum.</p>  
</div> 
<br>  

<div class="col-md-3">  
<p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum velit quis magna iaculis lacinia. Aenean sed nisi condimentum, placerat eros sit amet, lacinia purus. Ut sed euismod mauris. Morbi vitae diam quis diam egestas scelerisque a a ipsum.</p>  
</div>  

<div class="col-md-3">  
<p class="lead">  
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum velit quis magna iaculis lacinia. Aenean sed nisi condimentum, placerat eros sit amet, lacinia purus. Ut sed euismod mauris. Morbi vitae diam quis diam egestas scelerisque a a ipsum.</p>  
</div>  

<div class="col-md-3">  
<p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum velit quis magna iaculis lacinia. Aenean sed nisi condimentum, placerat eros sit amet, lacinia purus. Ut sed euismod mauris. Morbi vitae diam quis diam egestas scelerisque a a ipsum.</p>  
</div>  

<div class="col-md-3">  
<p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum velit quis magna iaculis lacinia. Aenean sed nisi condimentum, placerat eros sit amet, lacinia purus. Ut sed euismod mauris. Morbi vitae diam quis diam egestas scelerisque a a ipsum.</p>  
</div>  
<br>

For more column combinations, visit [this post]({{ site.url }}/personal/fancy-columns/).

## BUTTONS

<a class="btn btn-danger btn-large">Some danger button</a>

<a class="btn btn-info btn-large">Some info button</a>  

<a class="btn btn-warning btn-large">Some warning button</a>

<a class="btn btn-success btn-large">Some success button</a>

<a class="btn btn-primary btn-large">Some primary button</a>
<br>

## ADVANCED USAGE

There's one fantastic secret about Markdown. If you want, you can write plain old HTML and it'll still work! Very flexible.

<input type="text" placeholder="I'm an input field!" />

That should be enough to get you started. Have fun - and let me know what you think [@hmfaysal](https://twitter.com/hmfaysal) or at [hmfaysal@alum.mit.edu](mailto:hmfaysal@alum.mit.edu) :)