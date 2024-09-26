<h2 id="up-publications" style="margin: 2px 0px -15px;">Upcoming Publications</h2>

<div class="publications">
<ol class="bibliography">

{% for link in site.data.up-publications.main %}

<li>
<div class="pub-gird">
  <div class="col-sm-3 abbr" style="position: relative;padding-right: 15px;padding-left: 15px;">
    {% if link.image %} 
    <img src="{{ link.image }}" class="teaser img-fluid z-depth-1" style="width=60%;height=40%">
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

<br>

{% endfor %}

</ol>
</div>

<style>
  .pub-grid {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    list-style-type: none;
  }
  
  .pub-grid li {
    flex: 1 1 calc(25% - 20px); /* 每行四个项目，留出间隔 */
    margin: 10px; /* 间隔 */
    box-sizing: border-box;
  }

  .pub-row {
    background: #f9f9f9; /* 背景颜色 */
    border-radius: 5px; /* 圆角 */
    padding: 10px; /* 内边距 */
    box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* 轻微阴影 */
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
  }
  
  .badge {
    background-color: #9b2226; /* 红色背景 */
    color: #fff; /* 白色文字 */
    margin-right: 5px; /* 右边距 */
    padding: 5px 10px; /* 内边距 */
    border-radius: 3px; /* 圆角 */
  }

  @media (max-width: 768px) {
    .pub-grid li {
      flex: 1 1 calc(50% - 20px); /* 中等屏幕每行两个项目 */
    }
  }

  @media (max-width: 480px) {
    .pub-grid li {
      flex: 1 1 100%; /* 小屏幕每行一个项目 */
    }
  }
</style>

