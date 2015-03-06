---
layout: post
title: "Sample Mathjax Post"
description: "MathJax Test article"
headline: 
category: Sample-Posts
tags: [sample post, mathjax]
imagefeature: picture-26.jpg
comments: true
mathjax: true
---
HMFAYSAL OMEGA theme supports both inline and displayed equations via MathJax.  The theme keeps MathJax turned off by default to improve page load speed. MathJax can be turned on from the post's Front Matter YAML. Simply put the following statement in the post's Front Matter YAML:

	mathjax: true

<br>
Here are some examples collected from the MathJax page: 
<br>

**The Lorenz Equations**

$$\begin{aligned}
\dot{x} & = \sigma(y-x) \\
\dot{y} & = \rho x - y - xz \\
\dot{z} & = -\beta z + xy
\end{aligned}$$

**The Cauchy-Schwarz Inequality**

$$
\left( \sum_{k=1}^n a_k b_k \right)^{\!\!2} \leq
 \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)
$$

**A Cross Product Formula**

$$
  \mathbf{V}_1 \times \mathbf{V}_2 =
   \begin{vmatrix}
    \mathbf{i} & \mathbf{j} & \mathbf{k} \\
    \frac{\partial X}{\partial u} & \frac{\partial Y}{\partial u} & 0 \\
    \frac{\partial X}{\partial v} & \frac{\partial Y}{\partial v} & 0 \\
   \end{vmatrix}
$$

**The probability of getting \(k\) heads when flipping \(n\) coins is:**

$$P(E) = {n \choose k} p^k (1-p)^{ n-k} $$

**An Identity of Ramanujan**

$$
   \frac{1}{(\sqrt{\phi \sqrt{5}}-\phi) e^{\frac25 \pi}} =
     1+\frac{e^{-2\pi}} {1+\frac{e^{-4\pi}} {1+\frac{e^{-6\pi}}
      {1+\frac{e^{-8\pi}} {1+\ldots} } } }
$$

**A Rogers-Ramanujan Identity**

$$
  1 +  \frac{q^2}{(1-q)}+\frac{q^6}{(1-q)(1-q^2)}+\cdots =
    \prod_{j=0}^{\infty}\frac{1}{(1-q^{5j+2})(1-q^{5j+3})},
     \quad\quad \text{for $|q|<1$}.
$$

**Maxwell's Equations**


$$\begin{align}
  \nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} & = \frac{4\pi}{c}\vec{\mathbf{j}} \\
  \nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\
  \nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\
  \nabla \cdot \vec{\mathbf{B}} & = 0
\end{align}$$  
  
<br>

Finally, while display equations look good for a page of samples, the
ability to mix math and text in a paragraph is also important.  This
expression $\(\sqrt{3x-1}+(1+x)^2\)$ is an example of an inline equation.  As
you see, MathJax equations can be used this way as well, without unduly
disturbing the spacing between lines.

In MathJax I use `$$...$$` or (`\begin{equation(*)}...\end{equation(*)}` also works) for displayed equations and `$....$` for inline equations. Take care of >,< and &, because they have special meanings in .html files. If your post/page is not displaying the equations properly, try to wrap the equations between `{{ "{% raw "}}%}...{{ "{% endraw "}}%}` tags.