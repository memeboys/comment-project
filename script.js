const form = document.getElementById("comment-form");
const list = document.getElementById("comment-list");
const date = document.querySelector(".date");

const maxDate = new Date().toISOString().split('T')[0];
date.setAttribute('max', maxDate);

function createDataForm(form) {

    const {elements} = form;

    let data = Array.from(elements)
        .filter((item) => item.name)
        .map((element) => {
            const {name, value} = element;
            return { name, value };
        });

    return createComment(data);
}

function createDate(data) {

    const time = `${new Date().getHours()}:${new Date().getMinutes() >= 9 ? 
      new Date().getMinutes() : 
      `0${new Date().getMinutes()}`}`;

    const currentDate = data[1].value ? 
      new Date(data[1].value).getDate() : 
      new Date().getDate();
      
    const differenceTime = new Date().getDate() - currentDate;

    switch(differenceTime) {
        case 0:
            return `Сегодня в ${time}`;
        case 1:
            return `Вчера в ${time}`;
        default:
            return data[1].value; 
    }

}

function createComment(data) {

    const name = data[0].value;
    let date = createDate(data);
    const description = data[2].value;

    const containerComment = document.createElement("div");
    containerComment.classList.add("comment-list__item");

    list.appendChild(containerComment);

    containerComment.innerHTML = `
        <div class="item__header">
            <div class="head">
                <p>${name}</p>
                <p>${date}</p>
            </div>
            <p class="item__comment">${description}</p>
        </div>
        <div class="item__action">
            <svg 
                width="25px" 
                height="25px" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    class="heart"
                    d="M12.39 20.87
                        a.696.696 0 0 
                        1-.78 0
                        C9.764 19.637 2 14.15 2 8.973
                        c0-6.68 7.85-7.75 
                        10-3.25 2.15-4.5 
                        10-3.43 10 3.25 0 5.178
                        -7.764 10.664
                        -9.61 11.895
                        z" 
                    fill="#ffffff"
                />
            </svg>
            <svg 
                class="trash"
                width="25px" 
                height="25px" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
            <path 
                d="
                    M10 10V16
                    M14 10V16
                    M18 6V18C18 19.1046 17.1046 20 16 20
                    H8C6.89543 20 6 19.1046 6 18
                    V6M4 6H20M15 6
                    V5C15 3.89543 14.1046 3 13 3
                    H11C9.89543 3 9 3.89543 9 5V6
                " 
                stroke="#E6E6E6" 
                stroke-width="1.5" 
                stroke-linecap="round" 
                stroke-linejoin="round"
            />
            </svg>
        </div>
    `;


    const like = containerComment.querySelector(".heart");
    const deleteButton = containerComment.querySelector(".trash");

    function handleLike() {
        like.classList.toggle('like');
    };
    function handleDelete() {
        containerComment.remove();
    };

    like.addEventListener('click', handleLike);
    deleteButton.addEventListener('click', handleDelete);
}

function handleFormSubmit(event) {
    event.preventDefault();
    createDataForm(form);
    form.reset();
};

form.addEventListener('submit', handleFormSubmit);