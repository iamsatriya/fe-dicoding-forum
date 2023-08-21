import React from 'react';
import Logo from '../../assets/img/logo.png';

function ThreadItems() {
  return (
    <article className="m-4 rounded-lg bg-[#f1f1f1] p-4 ">
      <p className="font-poppins font-semibold text-3xl truncate">Title</p>
      <section className="flex justify-between items-center my-2">
        <section className="flex items-center">
          <img src={Logo} alt="profile" className="w-12 h-12 rounded-lg" />
          <section className="flex flex-col ml-2">
            <span className="font-poppins font-semibold">Author Name</span>
            <span className="text-gray-400 font-light">6h ago</span>
          </section>
        </section>
        <section>
          <span className="inline-block px-2 py-1 bg-primary-light text-white text-sm rounded-md">Category</span>
        </section>
      </section>
      <section className="truncate mb-4">content</section>
      <section className="flex justify-between">
        <section className="flex">
          <section className="flex items-center mr-2">
            <button type="button" className="mr-1 bg-primary text-white h-7 w-7 grid place-items-center rounded-md">
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
            <button type="button" className="mr-1 bg-primary text-white h-7 w-7 grid place-items-center rounded-md">
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
        <button type="button" className="bg-primary rounded-lg text-white px-2 py-1">2 replies</button>
      </section>
    </article>
  );
}

export default ThreadItems;
