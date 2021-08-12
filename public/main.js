
const textarea = document.querySelector('textarea');


textarea.addEventListener('keyup', async (event) => {
    // Number 13 is the 'Enter' key on the keyboard
    if (event.key === 'Enter') {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click

        const cmd = event.target.value;

        const response = await post({input: cmd});


        if (response.status === 201) {
            const r = await response.json();

            console.log(r)
    
            textarea.value += r.out;
        }

    }
});


function post(model) {
    return fetch(`http://${window.location.hostname}:3000/api/home/cmd`, {
        method: "POST",
        body: JSON.stringify(model),
        cache: "no-cache",
        headers: new Headers({ "Content-Type": "application/json" })
    });
}

async function users() {
    const response = await fetch('./api/home/users')

    if (response.status === 200) {
        const r = await response.json();

        document.querySelector('#users').innerHTML = JSON.stringify(r);
    }
}