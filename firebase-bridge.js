// مكتبة جسر الربط المباشر الموحد بين الأوفلاين وسيرفر Firebase
const firebaseConfig = {
    databaseURL: "https://firebaseio.com"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// محاكاة الأوامر أونلاين: استبدال مصفوفة اللابتوب بالسيرفر السحابي تلقائياً
window.firebaseBridge = {
    syncToCloud: function(key, data) {
        database.ref(key).set(data).then(() => {
            console.log("☁️ تم مزامنة البيانات وتحديث السيرفر أونلاين فوراً!");
        }).catch((err) => {
            console.error("❌ فشل الاتصال بالسيرفر، تحقق من الـ Rules!");
        });
    },
    fetchFromCloud: function(key, callback) {
        database.ref(key).get().then((snapshot) => {
            if (snapshot.exists()) {
                callback(snapshot.val());
            } else {
                callback([]);
            }
        }).catch((err) => {
            callback([]);
        });
    }
};
