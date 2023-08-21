import Logo from '../../assets/img/logo.png';

const ThreadItems = () => {
  return (
    <article className="m-4 rounded-lg bg-[#f1f1f1] p-4 ">
      <p className="font-poppins font-semibold text-3xl truncate">Title</p>
      <section className="flex justify-between items-center my-2">
        <section className="flex items-center">
          <img src={Logo} className="w-12 h-12 rounded-lg" />
          <section className="flex flex-col ml-2">
            <span className="font-poppins font-semibold">Author Name</span>
            <span className="text-gray-400 font-light">6h ago</span>
          </section>
        </section>
        <section>
          <span className="inline-block px-2 py-1 bg-primary-light text-white text-sm rounded-md">Category</span>
        </section>
      </section>
      <section className="truncate mb-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia repudiandae beatae aspernatur necessitatibus
        autem voluptate debitis aut! Culpa repellendus quo ducimus provident quae itaque, quis recusandae architecto
        debitis? Iste nam quis praesentium, quia eveniet sint eaque maiores, unde saepe commodi id ab harum non possimus
        dolor quos! Sed expedita illum totam quod cupiditate, eveniet ex magni officia earum unde quas. Ea animi,
        quibusdam veniam at deleniti repudiandae, sunt numquam pariatur consequatur deserunt odio molestias nisi aliquam
        doloremque. Assumenda itaque in totam, aliquam ducimus animi recusandae soluta! Iure nesciunt eum, quisquam quos
        dolor eligendi quae tempora optio ipsam pariatur nam repellendus consequuntur accusantium illum aperiam ullam
        accusamus sed. Suscipit et nemo dolores voluptate perferendis dolore inventore nihil ipsam enim laudantium
        saepe, ipsum delectus minima aperiam molestiae aliquid natus temporibus cupiditate nesciunt. Totam autem non
        obcaecati voluptate sint suscipit, aliquid debitis fugit minima? Laborum sunt temporibus quod hic alias
        possimus? Similique, laborum rerum rem ut pariatur molestiae ipsa, odit praesentium temporibus excepturi maxime
        necessitatibus sequi maiores in delectus recusandae amet. Atque, quibusdam quod natus incidunt commodi neque
        eius magnam iste ducimus aspernatur sed nulla tenetur est quia. Neque deleniti cumque accusamus velit? Officiis
        recusandae impedit eaque minima, dolorum atque sunt dignissimos voluptas.
      </section>
      <section className="flex justify-between">
        <section className="flex">
          <section className="flex items-center mr-2">
            <button className="mr-1 bg-primary text-white h-7 w-7 grid place-items-center rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </button>
            <span>12</span>
          </section>
          <section className="flex items-center">
            <button className="mr-1 bg-primary text-white h-7 w-7 grid place-items-center rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </button>
            <span>12</span>
          </section>
        </section>
        <button className="bg-primary rounded-lg text-white px-2 py-1">{2} replies</button>
      </section>
    </article>
  );
};

export default ThreadItems;
