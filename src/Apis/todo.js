//post todo

export const saveTodo = async (todo) => {
  if (todo) {
    const url = "http://localhost:5000/user-todo";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    const data = res.json();
    return data;
  }
};

//delete todo
export const deleteTodo = async (id) => {
  if (id) {
    const url = `http://localhost:5000/user-todo?id=${id}`;
    const res = await fetch(url, {
      method: "DELETE",
    });
    const data = res.json();
    return data;
  }
};

//edit todo
export const editTodo = async (id, data) => {
  const editedText = data;
  if (id) {
    const url = `http://localhost:5000/user-todo?id=${id}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({editedText}),
    });
    const data = res.json();
    return data;
  }
};
