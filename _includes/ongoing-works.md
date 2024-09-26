<h2 id="ongoing-work" style="margin: 2px 0px -15px;">Ongoing Works</h2>

<div class="publications">
<ol class="bibliography">
<ul style="display: flex; flex-wrap: wrap; list-style-type: none; padding: 0;">
{% for link in site.data.up-publications.main %}

<li>
<div class="pub-row">
  <div class="col-sm-3 abbr" style="position: relative;padding-right: 15px;padding-left: 15px;">
    {% if link.image %} 
    <img src="{{ link.image }}" class="teaser img-fluid z-depth-1" style="height: 123px; width: 175px">
    {% endif %}
      {% if link.topic %} 
        <div class="badge" style="background-color: #ae2012; color: #fff;">{{ link.topic }}</div>
      {% endif %}
  </div>
</div>
</li>

<br>

{% endfor %}
</ul>
</ol>
</div>

