<h2 id="up-publications" style="margin: 2px 0px -15px;">Upcoming Publications</h2>

<div class="publications">
<ol class="bibliography">

{% for link in site.data.up-publications.main %}

<li>
<div class="pub-row">
  <div class="col-sm-3 abbr" style="position: relative;padding-right: 15px;padding-left: 15px;">
    {% if link.image %} 
    <img src="{{ link.image }}" class="teaser img-fluid z-depth-1" style="width=100;height=40%">
    {% endif %}
    {% if link.author %} 
    <abbr class="badge">{{ link.author }}</abbr>
    {% endif %}
    <span style="margin: 0 5px;">&nbsp;</span>
    {% if link.topic %} 
    <abbr class="badge">{{ link.topic }}</abbr>
    {% endif %}
  </div>
</div>
</li>

<br>

{% endfor %}

</ol>
</div>

