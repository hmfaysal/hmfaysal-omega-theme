# HMFAYSAL OMEGA THEME

Project name:	HMFAYSAL OMEGA THEME  
Author:	Hossain Mohd Faysal  
Project type:	The Coolest Theme for Jekyll 
License:	MIT License 
  
HMFAYSAL OMEGA is a minimalist, beautiful, responsive theme for Jekyll designed for engineers as well as writers who want their content to take front and center. This theme elegantly wraps each page and post with featured images complementing the content. It was built -- by Engineer slash Mathematician [Hossain Mohd Faysal](http://alum.mit.edu/www/hmfaysal/).

The theme features:

* Twitter Bootstrap 3
* Option to set featured image that wraps your post in header and footer
* Custom Javascript to emphasize the first paragraph `p:first-child` of your post
* Variable templates for articles, quotation, video, photo and status updates (post types)
* Display Equations via Native MathJax Support
* Plugin-free/Github Pages Deployment Ready
* Read time Calculator: Calculation of post read-time based on word count (Via Liquid Tags instead of a plugin)
* Complex pagination script if you decide to turn pagination on
* CSS3 transitions for better performance 
* Ability to turn of animations in _config.yml
* Readable typography to make your words shine
* Disqus comments if you choose to enable
* Simple and clear permalink structure
* Footer Menu
* SVG graphics
* Google Fonts
* 361 Fontawesome icons
* Tags for [Open Graph](https://developers.facebook.com/docs/opengraph/) and [Twitter Cards](https://dev.twitter.com/docs/cards) for a better social sharing experience
* Beautifully crafted [404 page](http://hmfaysal.github.io/hmfaysal-omega-theme/404.html)
* Custom [categories](http://hmfaysal.github.io/hmfaysal-omega-theme/categories/) and [tags](http://hmfaysal.github.io/hmfaysal-omega-theme/tags/) pages for viewers pleasure
* Stylesheets for Pygments and Coderay to make your code examples look snazzy
* Simple search that overlays results based on post title
* Sitemap for search engines
* Designed by an Electrical Engineer

For a full list of features, visit [this link](http://hmfaysal.github.io/hmfaysal-omega-theme/theme-setup/about-hmfaysal-omega/)

![screenshot of HMFAYSAL OMEGA Theme](https://raw.github.com/hmfaysal/hmfaysal-omega-theme/gh-pages/images/hmfaysal-omega-preview.jpg)

## Basic Setup for new Jekyll site

1. [Install Jekyll](http://jekyllrb.com) and read through [this installation instructions](http://hmfaysal.github.io/hmfaysal-omega-theme/theme-setup/installing-jekyll-on-windows/) if you haven't already.
2. Fork the [HMFAYSAL OMEGA Theme](https://github.com/hmfaysal/hmfaysal-omega-theme/fork)
3. Clone the repo you just forked.
4. Edit `_config.yml` to personalize your site.
5. Check out the sample posts in `_posts` to see examples for pulling in large feature images, assigning categories and tags, and other YAML data.
6. Read the documentation below for further customization pointers and documentation.


**Pro-tip:** Delete the `gh-pages` branch after cloning and start fresh by branching off `master`. There is a bunch of garbage in `gh-pages` used for the theme's demo site that I'm guessing you don't want on your site.

---

## Setup for Existing Jekyll site

1. Clone the following folders: `_includes`, `_layouts`, `plugins`, `assets`, and `images`.
2. Clone the following files and personalize content as need: `about.md`, `technical-details.md`, `theme-setup.md`, `index.html`, `categories.html`, `tags.html`, `feed.xml`, and `sitemap.xml`.
3. Set the following variables in your `_config.yml` file:

``` yaml
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
  description:	  Some Details about yourself
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
```

---

## Post Front Matter YAML

HMFAYSAL OMEGA uses variable post templates for articles, quotation, video, photo and status updates. 

A new blog post should have the following structure to utilise the themes functions

``` yaml
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
```

A new status should have the following structure to utilise the themes functions

``` yaml
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
```

A new quotation post should have the following structure to utilise the themes functions

``` yaml
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
```

A new video post should have the following structure to utilise the themes functions

``` yaml
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
```

A new photo post should have the following structure to utilise the themes functions. By default, the featured image is shown on the blog index, but if you want to display another photo, you can choose to do so :)

``` yaml
---
layout: post
type:  photo                # ! Important
photo: some-image.jpg 		# In case you do not want the featured image to display on the front page
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
```

---

## Folder Structure
``` bash
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
```

---

## Questions?

Having a problem getting something to work or want to know why I setup something in a certain way? Ping me on Twitter [@hmfaysal](http://twitter.com/hmfaysal) or [file a GitHub Issue](https://github.com/hmfaysal/hmfaysal-omega-theme/issues/new).

---

## Requests?

If you have some specific requests for this theme, or if you need help custom coding some elements, message me on Twitter [@hmfaysal](http://twitter.com/hmfaysal) or email me at [hmfaysal@alum.mit.edu](mailto:hmfaysal@alum.mit.edu)

---

## License

This theme is free and open source software, distributed under the [The MIT License](LICENSE). So feel free to use this Jekyll theme on your site without linking back to me or using a disclaimer.

If you'd like to give me credit somewhere on your blog or tweet a shout out to [@hmfaysal](https://twitter.com/hmfaysal), that would be pretty sweet.


Warm Regards and Stay Creative,  
Hossain Mohd. Faysal