self.addEventListener("install", (event) => {
    event.waitUntil(
        this.skipWaiting()
    )
})

self.addEventListener("activate", (event)=>{
    console.log("Service worker activated, add your offline code here...");
})

self.addEventListener("sync", (event)=> {
    if(event.tag === "post-data") {
        console.log("sync code is running");
        var request = indexedDB.open("post-requests", 1);
        var db;
        request.onsuccess = (event) => {
            db = event.target.result;
            var tx = db.transaction('requests', 'readwrite');
            var store = tx.objectStore('requests');
            // var allData = store.getAll();
            const allData = store.openCursor();
            allData.onsuccess = e => {
                const cursor = e.target.result;
                if(cursor) {
                    console.log("current cursor", cursor.value);
                    fetch(cursor.value.url, {
                        method: "POST",
                        body: JSON.stringify(cursor.value.body),
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": cursor.value.token
                        }
                    }).then(res => res.json())
                    .then(response => {
                        console.log(response);
                        // setTimeout(()=>{
                            // }, 1000)
                    })
                    console.log("trying to delete", cursor.value.data);
                    store.delete(cursor.value.data);
                    cursor.continue();
                }
            }
        }
    }
})
