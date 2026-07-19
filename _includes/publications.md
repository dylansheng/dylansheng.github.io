<h2 id="publications">Publications</h2>

{% assign first_author_count = 0 %}
{% assign corresponding_count = 0 %}
{% assign collaboration_count = 0 %}
{% for link in site.data.publications.main %}
  {% assign author_lead = link.authors | strip | slice: 0, 32 %}
  {% if author_lead contains "Rui Sheng" %}
    {% assign first_author_count = first_author_count | plus: 1 %}
  {% elsif link.conference contains "Corresponding Author" or link.authors contains "Rui Sheng*" %}
    {% assign corresponding_count = corresponding_count | plus: 1 %}
  {% else %}
    {% assign collaboration_count = collaboration_count | plus: 1 %}
  {% endif %}
{% endfor %}

<div class="publication-filter" role="group" aria-label="Filter publications">
  <button type="button" class="publication-filter-button is-active" data-publication-filter="all" aria-pressed="true">All ({{ site.data.publications.main | size }})</button>
  <button type="button" class="publication-filter-button" data-publication-filter="first-author" aria-pressed="false">First-author ({{ first_author_count }})</button>
  <button type="button" class="publication-filter-button" data-publication-filter="corresponding" aria-pressed="false">Corresponding ({{ corresponding_count }})</button>
  <button type="button" class="publication-filter-button" data-publication-filter="collaboration" aria-pressed="false">Collaborative ({{ collaboration_count }})</button>
</div>

<div class="publications">
<ol class="bibliography" id="publication-list">

{% for link in site.data.publications.main %}
{% assign paper_role = "collaboration" %}
{% assign author_lead = link.authors | strip | slice: 0, 32 %}
{% if author_lead contains "Rui Sheng" %}
  {% assign paper_role = "first-author" %}
{% elsif link.conference contains "Corresponding Author" or link.authors contains "Rui Sheng*" %}
  {% assign paper_role = "corresponding" %}
{% endif %}

<li class="publication-item" data-paper-role="{{ paper_role }}">
<div class="pub-row">
  <div class="col-sm-3 abbr" style="position: relative;padding-right: 15px;padding-left: 15px;">
    {% if link.image %} 
    <img src="{{ link.image }}" class="teaser img-fluid z-depth-1" style="width=100;height=40%">
    {% endif %}
    {% if link.conference_short %} 
    <abbr class="badge">{{ link.conference_short }}</abbr>
    {% endif %}
  </div>
  <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 20px;">
      <div class="title"><a href="{{ link.pdf }}">{{ link.title }}</a></div>
      <div class="author">{{ link.authors }}</div>
      {% assign emphasized_conference = link.conference | replace: "Corresponding Author", "<span class='corresponding-label'>Corresponding Author</span>" %}
      <div class="periodical"><em>{{ emphasized_conference }}</em>
      </div>
    <div class="links">
      {% if link.pdf %} 
      <a href="{{ link.pdf }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">PDF</a>
      {% endif %}
      {% if link.code %} 
      <a href="{{ link.code }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Code</a>
      {% endif %}
      {% if link.page %} 
      <a href="{{ link.page }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Project Page</a>
      {% endif %}
      {% if link.bibtex %} 
      <a href="{{ link.bibtex }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">BibTex</a>
      {% endif %}
      {% if link.notes %} 
      <strong> <i style="color:#e74d3c">{{ link.notes }}</i></strong>
      {% endif %}
      {% if link.others %} 
      {{ link.others }}
      {% endif %}
    </div>
  </div>
</div>
</li>

{% endfor %}

</ol>
</div>
