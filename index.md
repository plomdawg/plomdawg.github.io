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
          {{ project.icon }} {{ project.name }}
        </a>
      </li>
    {% endfor %}
  </ul>
{% endfor %}

{% capture project_details %}
  {% for section in site.data.projects %}
    {% for project in section.projects %}
      <div id="{{ project.id }}" class="project-detail" style="display: none;">
        <div class="project-header">
          <h2>
            {{ project.name }}
            {% for link in project.links %}
              <a href="{{ link.url }}" target="_blank" class="btn btn-outline-secondary btn-sm">
                {% if link.name == "Source" %}
                  <ion-icon name="logo-github" class="me-1"></ion-icon>
                {% endif %}
                {{ link.name }}
              </a>
            {% endfor %}
          </h2>
          <p class="lead">{{ project.short_description }}</p>
          <hr>
        </div>

        <div class="project-demo">
          {% if project.demo.size > 0 %}
            <div class="demo-media">
              {% for item in project.demo %}
                <img src="{{ item }}" class="img-fluid rounded border mb-3" alt="{{ project.name }} screenshot">
              {% endfor %}
            </div>
          {% endif %}
        </div>

        <div class="project-content">
          {{ project.long_description | markdownify }}
          {% if project.commands %}
            <h5 class="mt-4">Commands</h5>
            <div class="command-list">
              {% for command in project.commands %}
                <div class="command">
                  <div class="command-name">
                    {% if command.icon %}
                      <span class="command-icon">{{ command.icon }}</span>
                    {% endif %}
                    <code>{{ command.name }}</code>
                  </div>
                  <div class="command-description">
                    <p>{{ command.description }}</p>
                    {% if command.demo %}
                      <img src="{{ command.demo }}" class="img-fluid rounded border" alt="{{ command.name }} demo">
                    {% endif %}
                    {% if command.hint %}
                      <p class="command-hint"><em>{{ command.hint }}</em></p>
                    {% endif %}
                  </div>
                </div>
              {% endfor %}
            </div>
          {% endif %}
        </div>
      </div>
    {% endfor %}
  {% endfor %}
{% endcapture %}

<script>
  const projectDetailsHTML = `{{ project_details }}`;
</script>