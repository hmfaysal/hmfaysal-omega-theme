---
layout: post
title: "Installing Jekyll on Windows"
description: Simple 10 step method to get started with Jekyll
headline: 
category: Theme-Setup
tags: [Jekyll, Installation]
imagefeature: picture-25.jpg
comments: true
mathjax: 
---
Welcome to HMFAYSAL OMEGA Theme for Jekyll. In this tutorial, I will show you how you can install and get started with Jekyll in 10 easy steps. While Jekyll itself is very easy to get started with, Jekyll has several dependencies which needed to be installed in order for Jekyll to work properly. The process of installing these requirements can be a little frustrating on any system, and it can be a tad bit more frustrating if you own a Windows PC. In this article, I will provide step-by-step details about installing Jekyll on windows and all its dependencies properly and will try to elaborate on the errors that one might encounter during the steps.

<section>
  <header>
    <h2 >Contents</h2>
  </header>
<div id="drawer" markdown="1">
*  Auto generated table of contents
{:toc}
</div>
</section>

 

## Step 1: Installing Ruby ##
 Jekyll is a Ruby-Gem. So obviously you’d need Ruby to be installed in your Windows PC, you’d also need the Ruby DevKit in your system too. There is an easy way to install Ruby on Windows, its called the RubyInstaller. So head over to RubyInstaller webpage and grab of copy of the latest Ruby. Select x86 or x64 based on your PC configuration. Then scroll down and to find the corresponding DevKit for your Ruby and download that too. Double click on the RubyInstaller to begin installing Ruby. There are a few caveats here. The directory name (*string) should not have any spaces(*whitespaces), though numbers, dash and underscores are acceptable. Also check Add Ruby to Path to make your life easier. Finish installing Ruby, then click on the DevKit extractor. Extract it to some convenient location like ~ C:\. Finally open up Command Prompt and change your directory to the extracted DevKit folder. Typing the following commands will initialize the Ruby Installation:

{% highlight bash %}
~ $ ruby dk.rb init
~ $ ruby dk.rb install
{% endhighlight %}

## Step 2: Installing Jekyll Gem ##
 Now that Ruby is installed, you can proceed to install Jekyll Gem. To do so, run the following Command:

{% highlight bash %}
~ $ gem install jekyll
{% endhighlight %}

Wait for a while for Jekyll to get downloaded and installed. Your command window might not show anything for upto half a minute as the Ruby-Gem server might be busy. Have a little patience, soon the download will start and Jekyll will download itself and all of the required gems in your system. In another note, the latest version of Jekyll is quite buggy. If you face any trouble in future running Jekyll, you can run the following statements to revert back to the last known stable version of Jekyll(1.2.1):

{% highlight bash %}
~ $ gem uninstall jekyll
~ $ gem install jekyll --version(="1.2.1")
{% endhighlight %}

## Step 3: Enabling Syntax Highlighting ##
 If you’re an engineer or a mathematician, occasionally you’d want to post code snippets in your blog. Jekyll utilizes a Gem called Pygments.rb to highlight your code snippets, which does not require any Javascript or client-side computation to show the Syntax Highlighting. Pygments.rb is dependent on Python. If you don’t have Python installed in your system, go the Python Download page, and download Python 2.7.x. Install it and make sure it has been added to the PATH. If you opt for not using syntax highlighting or use client-side implementation, make sure to turn pygments off by explicitly calling it off in the _config.yml file.

{% highlight ruby %}
pygments: false
{% endhighlight %}

### Step 4: Re-installing Pygments.rb ###
 The latest version of Pygments.rb(0.5.4) seems to have trouble when compiling with Jekyll. Now the latest version of Pygments.rb will be automatically downloaded in Step 2 along with Jekyll. To revert back to the last known stable version of Pygments.rb(0.5.0) simply run the following commands:


{% highlight bash %}
~ $ gem uninstall pygments.rb
~ $ gem install pygments.rb --version(="0.5.0")
{% endhighlight %}

## Step 5: Initializing a new blog ##
 By this step, you’ll have all the necessary gems to initialize a new blog. In my last post, I posted the codes to start a new blog. I will post them here again, simply type in the following commands:

Open up a browser window, navigate to http://localhost:4000 to see your site. In the CMD, press CTRL + C to stop the server.


{% highlight bash %}
~ $ jekyll new my-awesome-site
~ $ cd my-awesome-site
~ $ jekyll serve
{% endhighlight %}

## Step 6: Knowing the _config.yml file ##
 The _config.yml file in the my-awesome-site folder contains all the essential information about your new blog. When you run any Jekyll commands, the first file it reads is the _config.yml file, then proceeds to compile the site according to the instructions provided in the _config.yml file. A very basic _config.yml file would contain the following:

{% highlight ruby %}
name: Your New Jekyll Site
markdown: redcarpet
pygments: true
{% endhighlight %}

You can add many more statements to make you Jekyll site more versatile and user friendly. I will discuss them in another post.

 

## Step 7: Knowing the Jekyll folder structure ##
 Jekyll utilizes a certain folder structure to store and compile the site. When you first initialize a new site, your new site structure will look something like the following:

{% highlight bash %}
my-awesome-site/
|   .gitignore
|   index.html
|   _config.yml
|
+---css
|       main.css
|       syntax.css
|
+---_layouts
|       default.html
|       post.html
|
+---_posts
        2013-12-21-welcome-to-jekyll.markdown
{% endhighlight %}

The folder names that proceed with an underscore(_) tells Jekyll not to directly include those folders in the final compilation. Like the css folder that does not start with an underscore will be directly copied in the final compilation. This method helps to distinguish between the development environment and the production environment.

 

## Step 8: Adding new posts/Modifying posts ##
 This is most probably the most essential part that gives Jekyll its name. Jekyll is a blog aware static site generator, and without the blog part it would be useless. To add a new post, simply navigate to the _posts/ directory and create a new file with this structure YYYY-MM-DD-Title-Of-Your-New-Post.markdown. You can have the file in different extensions as per your choice, like *.md, *.textile etc. If you fail to name the file in this structure, Jekyll will ignore that post in the final compilation. Open up your newly created file, and fill out the Front matter YAML. This enables Jekyll to properly recognize the post and get essential information regarding the post, like its categories and tags. A simple post file should have the following Front matter YAML embedded on top:

{% highlight ruby %}
---
layout: post
title:  "Title of the Post"
date:   2013-12-21 15:47:09 #YYYY-MM-DD HH:MM:SS
categories: articles
---
Content goes here
{% endhighlight %}

The lines in between the triple dashes (—) provide the essential information about that post to the markdown/textile parser during Jekyll compilation.

 

## Step 9: Compiling the site for deployment ##
 After you’ve added one or few posts and you’re feeling ready to offload the site to a deployment environment, run the ~ $ jekyll serve command to see you site live at http://localhost:4000. Additionally you can run ~ $ jekyll serve -w to view the site live while you add/edit something and see the changes reflected instantly on the local server. When you’re quite happy with the results, press CTRL + C to stop the local server and run the following command:

{% highlight bash %}	
~ $ jekyll build
{% endhighlight %}

This will generate the site in the _site/ directory inside your Jekyll site folder, which is ready for deployment.

 

## Step 10: Deployment ##
 Deployment is painless with Jekyll. At this step, you can simply copy over the contents of the _site/ folder to your web-hosting over FTP. There are other novel approaches of deployment using Git and SSH, but that’s a matter of discussion for another day. Jekyll is a highly flexible platform, and it lets you do things in your way, a feature no other platforms can even offer.

 

If you’ve enjoyed this post, feel free to like it or share it on facebook, or give me a shoutout in twitter @hmfaysal