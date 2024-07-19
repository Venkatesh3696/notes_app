const bodyEl = document.body;

let notes;
const renderNotes = async () => {
  fetch("http://localhost:5000/notes").then((res) => console.log(res));
};

renderNotes();
