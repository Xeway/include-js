for (include of document.querySelectorAll("include")) {
    // https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
    fetch(include.attributes.src.value)
    .then((response) => response.body)
    .then((rb) => {
        const reader = rb.getReader();

        return new ReadableStream({
            start(controller) {
                function push() {
                    reader.read().then(({ done, value }) => {
                        if (done) {
                            controller.close();
                            return;
                        }
                        controller.enqueue(value);
                        push();
                    });
                }

                push();
            },
        });
    })
    .then((stream) =>
        new Response(stream, { headers: { 'Content-Type': 'text/html' } }).text()
    )
    .then((result) => {
        // https://gomakethings.com/converting-a-string-into-markup-with-vanilla-js/
        const parser = new DOMParser();
        const includedElements = parser.parseFromString(result, 'text/html');

        for (includedElement of Array.from(includedElements.body.childNodes)) {
            include.parentNode.insertBefore(includedElement, include);
        }

        include.remove();
    })
    .catch(err => console.error(err));
}
