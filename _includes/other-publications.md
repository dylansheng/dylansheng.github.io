<h2 id="up-publications">Papers Under Review</h2>
<p class="under-review-intro">
Completed work currently under review. Please contact me if you would like to discuss these projects.
</p>
<div class="publications other-publications">
<ul class="other-publications-grid">
{% for link in site.data.other-publications.main %}

<li class="other-publication-item">
<div class="other-publication-card">
    {% if link.image %} 
    <img src="{{ link.image }}" class="teaser img-fluid z-depth-1" alt="">
    {% endif %}
    <div class="other-publication-tags">
      {% if link.author %}  
        <span class="other-publication-tag is-author">{{ link.author }}</span>
      {% endif %}
      {% if link.topic %} 
        <span class="other-publication-tag is-topic">{{ link.topic }}</span>
      {% endif %}
    </div>
</div>
</li>

{% endfor %}
</ul>
</div>
