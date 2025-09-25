(function(){
  function setName(name){
    document.getElementById('name-placeholder').textContent = name || 'Guest';
    localStorage.setItem('mockup_name', name || 'Guest');
  }

  function promptName(){
    var current = localStorage.getItem('mockup_name');
    var ask = prompt('Enter your name:', current && current !== 'Guest' ? current : '');
    if(ask !== null){ setName(ask.trim() || 'Guest'); }
  }

  document.addEventListener('DOMContentLoaded', function(){
    var stored = localStorage.getItem('mockup_name') || 'Guest';
    setName(stored);

    document.getElementById('change-name').addEventListener('click', promptName);

    var form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = form.name.value.trim();
      var subject = form.subject.value.trim();
      var message = form.message.value.trim();
      if(!name || !message){
        alert('Please fill required fields: Name and Message');
        return;
      }
      var out = document.getElementById('submitted-values');
      out.innerHTML = '<strong>Submitted values:</strong>' +
        '<div>Name: ' + escapeHtml(name) + '</div>' +
        '<div>Subject: ' + escapeHtml(subject) + '</div>' +
        '<div>Message: ' + escapeHtml(message) + '</div>';

      form.reset();
    });

    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click', function(ev){
        ev.preventDefault();
        var id = this.getAttribute('href').slice(1);
        var el = document.getElementById(id);
        if(el) el.scrollIntoView({behavior:'smooth'});
      });
    });
  });

  function escapeHtml(s){
    return s.replace(/[&<>\"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c];
    });
  }
})();