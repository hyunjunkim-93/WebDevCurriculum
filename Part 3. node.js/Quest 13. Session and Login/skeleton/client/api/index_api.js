export default async function customFetch(methodType = 'GET', path = '', data = {}) {
    let response;
    if (methodType === 'GET') {
        response = await fetch(`http://localhost:8080/api${path}`, {
            method: methodType,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } else {
        response = await fetch(`http://localhost:8080/api${path}`, {
            method: methodType,
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }
    return response.json();
}
