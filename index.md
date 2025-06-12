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
            <a href="{{ link.url }}" target="_blank" class="btn btn-outline-secondary btn-sm">{{ link.name }}</a>
          {% endfor %}
        </h2>
        <p class="lead">{{ project.short_description }}</p>
        <hr>

        <div class="row my-4">
          {% for item in project.demo %}
            <div class="col-md-6 mb-3">
              <img src="{{ item }}" class="img-fluid rounded border" alt="{{ project.name }} screenshot">
            </div>
          {% endfor %}
        </div>

        {{ project.long_description | markdownify }}
      </div>
    {% endfor %}
  {% endfor %}
{% endcapture %}

<script>
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('project-details-container').innerHTML = `{{ project_details | escape }}`;
  });
</script>