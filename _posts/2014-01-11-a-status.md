---
layout: post
type: status
title: "Sample Status Post"
description: "This is a sample status"
category: Sample-Posts
tags: [sample post, status]
imagefeature: picture-10.jpg
comments: true
mathjax: 
---
Oh Hello. This is a status post. Click here to learn about it more :-)

Don't worry, you can enter additional details about your status update. Only the first paragraph `[p:first-child]` will be shown in the home page :-)

To start a status post, simply run `rake newstatus['Some Status Title']` in the command line. Or if you want to create the post by yourself, make sure your post contains the following contents in your post's Front Matter YAML:

    ---
    layout: post
    type: status
    title: "Sample Status Title"
    description: 
    headline: 
    modified: YYYY-MM-DD
    category: status
    image: 
      feature: 
    comments: true
    mathjax: 
    ---