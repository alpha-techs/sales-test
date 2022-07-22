importScripts('https://www.gstatic.com/firebasejs/7.12.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.12.0/firebase-messaging.js');

var firebaseConfig = {
  apiKey: "AIzaSyCjHq5yeIOheQ_EiArA5-o45ohrPLLHlv0",
  authDomain: "sales-yang.firebaseapp.com",
  databaseURL: "https://sales-yang.firebaseio.com",
  projectId: "sales-yang",
  storageBucket: "sales-yang.appspot.com",
  messagingSenderId: "998844496606",
  appId: "1:998844496606:web:7427870db9ee3911e6204f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize data here
  const title = payload.data.title;
  const options = {
    body: payload.data.body,
    icon: payload.data.icon,
    data: { url: payload.data.link },
  };
  console.log(options);
  return self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', function(event) {
  console.log("notification open");
  if (event.notification.data.url) {
      event.notification.close();
      clients.openWindow(event.notification.data.url);
  }
}, false);

self.addEventListener("notificationclose", function(event) {
  console.log("notification close");
  // log send to server
});