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
    <div style="position: absolute; top: 8px; left: 20px; display: flex; flex-wrap: wrap;">
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

<br>

{% endfor %}

</ol>
</div>

