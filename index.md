---
layout: home
title: Yadnyesh's Projects
---

# Yadnyesh's Projects

Welcome to my projects documentation hub. This site automatically synchronizes with README files from my GitHub repositories.

## Project List

{% for post in site.posts %}
  <div class="project-card">
    <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    {% if post.description %}
      <p>{{ post.description }}</p>
    {% endif %}
    <p class="project-meta">
      Updated: {{ post.date | date: "%b %-d, %Y" }} • 
      <a href="https://github.com/{{ post.repository }}" target="_blank">View on GitHub</a>
    </p>
  </div>
{% endfor %}