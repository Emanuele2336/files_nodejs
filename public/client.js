(async () => {
    const inputFile = document.querySelector('#file');
    const button = document.querySelector("#button");
    const link = document.querySelector("#link");
    const listaFile = document.querySelector("#lista");
    const get =  () => {
        fetch("/filelist")
            .then(res => {return res.json();})
            .then(files => {
                listaFile.innerHTML = files.map(fileUrl =>
                    `<li><a href="${fileUrl}" target="_blank">${fileUrl}</a></li>`
                ).join('');
            });
};
  
    handleSubmit = async (event) => {
      const formData = new FormData();
      formData.append("file", inputFile.files[0]);
      const body = formData;
      body.description = inputFile.value;
      const fetchOptions = {
        method: 'post',
        body: body
      };
      try {
        const res = await fetch("/upload", fetchOptions);
        const data = await res.json();
        link.setAttribute("href", data.url);
        link.innerText = data.url;
      } catch (e) {
        console.log(e);
      }
    }
  
    button.onclick = handleSubmit;
    get();
  })();