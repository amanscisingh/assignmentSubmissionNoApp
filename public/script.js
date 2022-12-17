// Registration service workers
if( "serviceWorker" in navigator) {
    window.addEventListener("load", ()=> {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log("Service Worker Registration: Success");
            console.log(registration);
        })
        .catch(err => {
            console.log("Service Worker Registration: Failure");
            console.log(err);
        })
    })
}

// registering background sync 
function backgroundSync() {
    navigator.serviceWorker.ready
    .then(swReg => swReg.sync.register("post-data"))
    .catch(console.log)
}

// setting up indexedDB
const request = indexedDB.open("post-requests", 1);
let db;
request.onupgradeneeded = e => {
    db = e.target.result;
    db.createObjectStore("requests", { keyPath: "data" })
    // alert("upgrade is called")
}

request.onsuccess = e => {
    db = e.target.result;
    alert(`success is called ${db.name} and version is ${db.version}`)
}

request.onerror = e => {
    alert("error is called")
}

// reading from csv // name, phone, email, linkedin
document.getElementById("file").addEventListener('input', event => {
    const reader = new FileReader()
    reader.onload = (e)=> {
        // console.log(e.target.result);
        var tx = db.transaction("requests", "readwrite");
        const store = tx.objectStore("requests")
        let allText = e.target.result;
        var obj={};
        let allData = allText.split('\n');
        for(let i=1; i<=allData.length; i++) {
            obj.data = i;
            obj.url = "/api/contacts";
            let keys = allData[i-1].split(',');
            obj.body = {
                name : keys[0],
                phone : keys[1],
                email : keys[2],
                linkedin : keys[3]
            }
            obj.token = localStorage.getItem("token");
            store.add(obj);
        }
    }
    reader.readAsText(document.getElementById("file").files[0])
    backgroundSync();
})