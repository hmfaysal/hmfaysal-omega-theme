---
layout: page
permalink: /documentation/
title: Documentation
description: "Instructions on how to install and customize the HMFAYSAL OMEGA Theme."
tags: [Jekyll, theme, install, setup]
image: 
  feature: picture-11.jpg
---

General notes and suggestions for customizing **HMFAYSAL OMEGA Theme**.

<section id="table-of-contents" class="toc">
  <header>
    <h3 >Contents</h3>
  </header>
<div id="drawer" markdown="1">
*  Auto generated table of contents
{:toc}
</div>
</section><!-- /#table-of-contents -->

## Basic Setup for a new Jekyll site

1. [Install Jekyll](http://jekyllrb.com) and read through [this installation instructions]({{ site.url }}/theme-setup/installing-jekyll-on-windows/) if you haven't already.
2. Fork the [HMFAYSAL OMEGA Theme repo](https://github.com/hmfaysal/hmfaysal-omega-theme/fork)
3. Clone the repo you just forked.
4. Edit `_config.yml` to personalize your site.
5. Check out the sample posts in `_posts` to see examples for quotation posts, status posts, pulling in feature images wrap, assigning categories and tags, and other YAML data.
6. Read the documentation below for further customization pointers and documentation.
<br>
<br>

<div class="span7 text-center" markdown="0"><a href="https://github.com/hmfaysal/hmfaysal-omega-theme/archive/master.zip" class="btn btn-success btn-large"><i class="icon-download-alt"></i> Download the Theme</a></div>  
<br>

**Pro-tip:** Delete the `gh-pages` branch after cloning and start fresh by branching off `master`. There is a bunch of garbage in `gh-pages` used for the theme's demo site that I'm guessing you don't want on your site.
{: .notice}

---

## Setup for an Existing Jekyll site

1. Clone the following folders: `_includes`, `_layouts`, `assets`, and `images`.
2. Clone the following files and personalize content as need: `about.md`, `articles.html`, `index.html`, `tags.html`, `feed.xml`, and `sitemap.xml`.
3. Set the following variables in your `config.yml` file:

{% highlight yaml %}
title:            Site Title
description:      Site description for the metas.
logo:             site-logo.png
disqus_shortname: shortname
# Assign a default image for your site's header and footer
default_bg:       some-image.jpg
search:           true
share:            true
# Read Time is a calculator tp provide post read-time based on word count. Usage is recommended.
readtime:         true
# Turn on or off the fin animations in the header and footer
animated_fins:    true
# Specify the fin color in RGB value
fin_color:        "255,255,255"
# Change url to your domain. Leave localhost server or blank when working locally.
url:              "http://localhost:4000"


# Owner/author information
owner:
  name:           Your Name
  avatar:         your-photo.jpg
  email:          your@email.com
  # Use the coder's toolbox at http://coderstoolbox.net/string/#!encoding=xml&action=encode&charset=us_ascii to encode your description into XML string
  description:    Some Details about yourself
  # Social networking links used in footer. Update and remove as you like.
  # To register at HMFAYSAL SOCIAL, visit http://social.hmfaysal.tk
  twitter:
  facebook:
  github:
  linkedin:
  instagram:
  tumblr:
  hmfaysalsocial:
  # For Google Authorship https://plus.google.com/authorship
  google_plus:    "http://plus.google.com/123123123123132123"

# Analytics and webmaster tools stuff goes here
google_analytics:
google_verify:
# https://ssl.bing.com/webmaster/configure/verify/ownership Option 2 content= goes here
bing_verify:

# Links to include in top navigation
# For external links add external: true
links:
  - title: Home
    url: /
    external: false
    icon: home
  - title: <i class="icon-book"></i> Documentation
    url: /documentation
  - title: Categories
    url: /categories
  - title: Tags
    url: /tags
  - title: Faysal who?
    url: /hossain-mohd-faysal

# http://en.wikipedia.org/wiki/List_of_tz_database_time_zones
timezone:    America/New_York
future:      true
pygments:    true
markdown:    kramdown
paginate:    6
paginate_path: "page:num"

# https://github.com/mojombo/jekyll/wiki/Permalinks
permalink:   /:categories/:title

kramdown:
  auto_ids: true
  footnote_nr: 1
  entity_output: as_char
  toc_levels: 1..6
  use_coderay: false

  coderay:
    coderay_line_numbers: 
    coderay_line_numbers_start: 1
    coderay_tab_width: 4
    coderay_bold_every: 10
    coderay_css: class
{% endhighlight %}

---

## Post Front Matter YAML

HMFAYSAL OMEGA uses variable post templates for articles, quotation, video, photo and status updates. 

A new blog post should have the following structure to utilise the themes functions

{% highlight yaml %}
---
layout: post
title: "Some Title"					# Title of the post
description: Some description		# Description of the post, used for Facebook Opengraph & Twitter
headline: Some headline				# Will appear in bold letters on top of the post
modified: YYYY-MM-DD				# Date
category: personal
tags: []
image: 
  feature: some-image.jpg
comments: true
mathjax:
---
{% endhighlight %}

A new status should have the following structure to utilise the themes functions

{% highlight yaml %}
---
layout: post
type: status                # ! Important
title: "Some Title"         # Title of the post
description: Some description   # Description of the post, used for Facebook Opengraph & Twitter
headline: Some headline       # Will appear in bold letters on top of the post
modified: YYYY-MM-DD        # Date
category: personal
tags: []
image: 
  feature: some-image.jpg
comments: true
mathjax:
---
{% endhighlight %}

A new quotation post should have the following structure to utilise the themes functions

{% highlight yaml %}
---
layout: post
type:  quote                # ! Important
title: "Some Title"         # Title of the post
description: Some description   # Description of the post, used for Facebook Opengraph & Twitter
headline: Some headline       # Will appear in bold letters on top of the post
modified: YYYY-MM-DD        # Date
category: personal
tags: []
image: 
  feature: some-image.jpg
comments: true
mathjax:
---
{% endhighlight %}

A new video post should have the following structure to utilise the themes functions

{% highlight yaml %}
---
layout: post
type:  video                # ! Important
title: "Some Title"         # Title of the post
description: Some description   # Description of the post, used for Facebook Opengraph & Twitter
headline: Some headline       # Will appear in bold letters on top of the post
modified: YYYY-MM-DD        # Date
category: personal
tags: []
image: 
  feature: some-image.jpg
comments: true
mathjax:
---
{% endhighlight %}

A new photo post should have the following structure to utilise the themes functions. By default, the featured image is shown on the blog index, but if you want to display another photo, you can choose to do so :)

{% highlight yaml %}
---
layout: post
type:  photo                # ! Important
photo: some-image.jpg     # In case you do not want the featured image to display on the front page
title: "Some Title"         # Title of the post
description: Some description   # Description of the post, used for Facebook Opengraph & Twitter
headline: Some headline       # Will appear in bold letters on top of the post
modified: YYYY-MM-DD        # Date
category: personal
tags: []
image: 
  feature: some-image2.jpg
comments: true
mathjax:
---
{% endhighlight %}

---

## Folder Structure

{% highlight bash %}
HMFAYSAL-OMEGA-THEME
│
│
├───assets
│   ├───css
│   │       bootstrap.css
│   │       style.css
│   │
│   ├───font
│   │       fontawesome─webfont.svg
│   │       fontawesome─webfontd41d.eot
│   │       fontawesome─webfontf77b.eot
│   │       fontawesome─webfontf77b.ttf
│   │       fontawesome─webfontf77b.woff
│   │
│   ├───fonts
│   │   ├───glyphicons─halflings─regular.eot
│   │   │       index.html
│   │   │
│   │   ├───glyphicons─halflings─regular.svg
│   │   │       index.html
│   │   │
│   │   ├───glyphicons─halflings─regular.ttf
│   │   │       index.html
│   │   │
│   │   └───glyphicons─halflings─regular.woff
│   │           index.html
│   │
│   └───js
│       │   script.js
│       │   scripts.min.js
│       │   waypoints.min.js
│       │   _main.js
│       │
│       ├───plugins
│       │       jquery.fitvids.js
│       │       jquery.magnific─popup.js
│       │       simpleJekyllSearch.js
│       │
│       └───vendor
│               jquery─1.9.1.min.js
│
├───images
│
├───_includes
│       browser─upgrade.html
│       disqus_comments.html
│       footer.html
│       head.html
│       header.html
│       scripts.html
│       signoff.html
│
├───_layouts
│       home.html
│       page.html
│       post.html
│
└───_posts
{% endhighlight %}

---

## Customization

### _config.yml

Most of the variables found here are used in the .html files found in `_includes` if you need to add or remove anything. A good place to start would be to change the title, tagline, description, and url of your site. Links are absolute and prefixed with `{{ "{{ site.url " }}}}` in the various `_includes` and `_layouts`, so remember to properly set `url`[^1] and use `http://localhost:4000` when developing locally or else the theme's stylesheet and scripts won't load.
#### Disqus Comments

Create a [Disqus](http://disqus.com) account and change `disqus_shortname` in `_config.yml` to the Disqus *shortname* you just setup. To enable commenting on a post, add the following to its front matter:

{% highlight yaml %}
comments: true
{% endhighlight %}

#### Default Background

Change the default background (1024x768 pixels or larger) which wraps your site from header to footer and acts as a placeholder background in case no featured image has been selected in the post YAML.

#### Read-time Calculator

Enable or disable the Estimated Reading Time (ERT) of an article. Very recommended to use this feature as it increases user engagement.

#### Fin animations and Fin color

Enable or disable fin animations in header and footer. To find RGB color [visit here](http://www.rapidtables.com/web/color/RGB_Color.htm)

#### Owner/Author Information

Change your name, and avatar photo (200x200 pixels or larger), email, and social networking urls. If you want to link to an external image on Gravatar or something similiar you'll need to edit the path in `head.html` since it assumes it is located in `/images`.

Including a link to your Google+ profile has the added benefit of displaying [Google Authorship](https://plus.google.com/authorship) in Google search results if you've went ahead and applied for it.

#### Google Analytics and Webmaster Tools

Your Google Analytics ID goes here along with meta tags for [Google Webmaster Tools](http://support.google.com/webmasters/bin/answer.py?hl=en&answer=35179) and [Bing Webmaster Tools](https://ssl.bing.com/webmaster/configure/verify/ownershi) site verification.

#### Top Navigation Links

Edit page/post titles and URLs to include in the site's navigation. For external links add `external: true`.

{% highlight yaml %}
# sample top navigation links
links:
  - title: Home
    url: /
    external: false
    icon: home
  - title: <i class="icon-book"></i> Documentation
    url: /documentation
  - title: Categories
    url: /categories
  - title: Tags
    url: /tags
  - title: Faysal who?
    url: /hossain-mohd-faysal
{% endhighlight %}

#### Simple Search

Adding the following to `_config.yml` enables search using Christian Fei's [Simple Jekyll jQuery plugin](https://github.com/christian-fei/Simple-Jekyll-Search). Clicking search will trigger a fullscreen overlay that searches post titles' using an autogenerated JSON file.

{% highlight yaml %}
search: true
{% endhighlight %}

<figure>
  <img src="{{ site.url }}/images/simple-search-screenshot.jpg" alt="search screenshot">
  <figcaption>Clicking search triggers an overlay that allows you to search by post title.</figcaption>
</figure>

#### Other Stuff

The rest is just your average Jekyll config settings. Nothing too crazy here...

### _includes

For the most part you can leave these as is since the author/owner details are pulled from `_config.yml`. That said you'll probably want to customize the copyright stuff in `footer.html` to your liking.

### Adding Posts and Pages

There are two main content layouts: `post.html` (for posts) and `page.html` (for pages). Both have support for large **feature images** that span the full-width of the screen, and both are meant for text heavy blog posts (or articles). 

#### Feature Images

A good rule of thumb is to keep feature images nice and wide. An image cropped around around 1024 x 768 pixels will keep file size down with an acceptable resolution for most devices. If you want to serve these images responsively I'd suggest looking at [Picturefill](https://github.com/scottjehl/picturefill) or [Adaptive Images](http://adaptive-images.com/).

The two layouts make the assumption that the feature images live in the *images* folder. To add a feature image to a post or page just include the filename in the front matter like so. 

{% highlight yaml %}
image:
  feature: feature-image-filename.jpg
  thumb: thumbnail-image.jpg #keep it square 200x200 px is good
{% endhighlight %}


#### Categories

In the sample `_posts` folder you may have noticed `category: articles` in the front matter. I like keeping all posts grouped in the same folder. If you decide to rename or add categories you will need to modify the permalink in `articles.md` along with the filename (if renaming).

For example. Say you want to group all your posts under `blog/` instead of `articles/`. In your post add `category: blog` to the front matter, rename or duplicate `articles.md` to `blog.md` and change the permalink in that file to `permalink: /blog/index.html`.

If done correctly `/blog` should be a page listing all the site's posts.

#### Post/Page Thumbnails for OG and Twitter Cards

Post and page thumbnails work the same way. These are used by [Open Graph](https://developers.facebook.com/docs/opengraph/) and [Twitter Cards](https://dev.twitter.com/docs/cards) meta tags found in `head.html`. If you don't assign a thumbnail the image you assigned to `site.owner.avatar` in `_config.yml will be used.

Here's an example of what a tweet to your site could look like if you activate Twitter Cards and include all the metas in your post's YAML.

<figure>
<img src="{{ site.url }}/images/twitter-card-summary-large-image.jpg" alt="search screenshot">
</figure>

#### Videos

Video embeds are responsive and scale with the width of the main content block with the help of [FitVids](http://fitvidsjs.com/).

Not sure if this only effects Kramdown or if it's an issue with Markdown in general. But adding YouTube video embeds causes errors when building your Jekyll site. To fix add a space between the `<iframe>` tags and remove `allowfullscreen`. Example below:

{% highlight html %}
<iframe width="560" height="315" src="//www.youtube.com/embed/CQJByFp7H38" frameborder="0"> </iframe>
{% endhighlight %}

#### Social Share Links

To enable Facebook, Twitter, and Google+ share links on a post or page, add the following to its front matter:

{% highlight yaml %}
share: true
{% endhighlight %}

#### Twitter Cards

Twitter cards make it possible to attach images and post summaries to Tweets that link to your content. Summary Card meta tags have been added to `head.html` to support this, you just need to [validate and apply your domain](https://dev.twitter.com/docs/cards) to turn it on.


#### Error 404 page

If you're hosting your site with Github Pages, simply dropping the 404.html in the root folder will redirect all bad requests to this page. But if you're hosting with some other provider, simply make a `.htaccess` file with the following code in it and drop it in the root folder.

{% highlight yaml %}
ErrorDocument 404 /404.html
{% endhighlight %}

---

## Questions?

Having a problem getting something to work or want to know why I setup something in a certain way? Ping me on Twitter [@hmfaysal](http://twitter.com/hmfaysal) or [file a GitHub Issue](https://github.com/hmfaysal/hmfaysal-omega-theme/issues/new).

---

## Requests?

If you have some specific requests for this theme, or if you need help custom coding some elements, message me on Twitter [@hmfaysal](http://twitter.com/hmfaysal) or email me at [hmfaysal@alum.mit.edu](mailto:hmfaysal@alum.mit.edu)

---

## License

This theme is free and open source software, distributed under the [The MIT License]({{ site.url }}/license/). So feel free to use this Jekyll theme on your site without linking back to me or using a disclaimer.

If you'd like to give me credit somewhere on your blog or tweet a shout out to [@hmfaysal](https://twitter.com/hmfaysal), that would be pretty sweet.

[^1]: Used to generate absolute urls in `sitemap.xml`, `feed.xml`, and for canonical urls in `head.html`. Don't include a trailing `/` in your base url ie: http://hmfaysal.github.io. When developing locally I suggest using `http://localhost:4000` or whatever server you're using to properly load the theme's stylesheet, scripts, and image assets. If you leave this variable blank all links will resolve correctly except those pointing home.