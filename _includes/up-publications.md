<h2 id="up-publications" style="margin: 2px 0px -15px;">Upcoming Papers</h2>

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
    <div style="position: absolute; top: 8px; left: 16px; display: flex; flex-wrap: wrap;">
      {% if link.author %}  
        <div class="badge" style="background-color: #9b2226; color: #fff; margin-right: 5px;">{{ link.author }}</div>
      {% endif %}
      {% if link.topic %} 
        <div class="badge" style="background-color: #344e41; color: #fff;">{{ link.topic }}</div>
      {% endif %}
    </div>
  </div>
</div>
</li>
</ul>

<br>

{% endfor %}

</ol>
</div>

