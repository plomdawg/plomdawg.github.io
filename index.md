---
layout: default
---

{% for section in site.data.projects %}
  <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
    <span>{{ section.section }}</span>
  </h6>
  <ul class="nav flex-column">
    {% for project in section.projects %}
      <li class="nav-item">
        <a class="nav-link project-link" href="#" data-target="{{ project.id }}">
          <ion-icon name="{{ project.icon }}"></ion-icon>
          {{ project.name }}
        </a>
      </li>
    {% endfor %}
  </ul>
{% endfor %}

{% capture project_details %}
  {% for section in site.data.projects %}
    {% for project in section.projects %}
      <div id="{{ project.id }}" class="project-detail" style="display: none;">
        <h2>{{ project.name }}
          {% for link in project.links %}
            <a href="{{ link.url }}" target="_blank" class="btn btn-outline-secondary btn-sm">
              {% if link.name == "Source" %}
                <ion-icon name="logo-github"></ion-icon>
              {% endif %}
              {{ link.name }}
            </a>
          {% endfor %}
        </h2>
        <p class="lead">{{ project.short_description }}</p>
        <hr>

        <div class="demo-media">
          {% for item in project.demo %}
            <img src="{{ item }}" class="img-fluid rounded border mb-3" alt="{{ project.name }} screenshot">
          {% endfor %}
        </div>

        {{ project.long_description | markdownify }}
      </div>
    {% endfor %}
  {% endfor %}
{% endcapture %}

<script>
  // Safely pass the Jekyll-generated HTML to a JavaScript variable
  const projectDetailsHTML = {{ project_details | jsonify }};
</script>