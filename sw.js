self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{
  let d={};try{d=e.data?e.data.json():{}}catch(_){}
  e.waitUntil(self.registration.showNotification(d.title||'Nangalkot Blood Connect',{body:d.body||'',tag:d.tag||undefined,data:{url:d.url||'#/'},vibrate:[200,100,200]}));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const base=self.registration.scope;const target=base+((e.notification.data&&e.notification.data.url)||'');
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{
    for(const c of list){if(c.url.indexOf(base)===0){c.navigate(target);return c.focus()}}
    return self.clients.openWindow(target);
  }));
});
