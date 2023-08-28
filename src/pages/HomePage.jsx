import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";
import Logo from "../assets/img/logo.png";
import ThreadItems from "../components/threads/ThreadItems";
import InputText from "../components/inputs/InputText";
import ButtonPrimary from "../components/buttons/ButtonPrimary";

function HomePage() {
  const formRef = useRef();
  const titleRef = useRef();
  const dispatch = useDispatch();
  const [isShowCreate, setIsShowCreate] = useState(false);
  const {
    users = [],
    threads = [],
    authUser,
  } = useSelector((states) => states);
  
  const listenToScroll = () => {
    const formHeight = formRef?.current?.clientHeight;
    if (
      (document.body.scrollTop || document.documentElement.scrollTop) >
      formHeight
    ) {
      setIsShowCreate(true);
    } else {
      setIsShowCreate(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onScrollToTop = () => {
    window.scrollTo(0, 0);
    titleRef.current?.focus();
  };

  return (
    <>
      <header className="p-4 h-20 z-10 bg-[#fff] flex justify-between items-center fixed top-0 w-full">
        <section>
          <img src={Logo} alt="Logo" className="w-11 h-11" />
        </section>
        <section>
          <button type="button" className="inline-block mx-2">
            Home
          </button>
          <button type="button" className="inline-block mx-2">
            Leaderboard
          </button>
          <button type="button" className="inline-block mx-2 text-primary">
            Logout
          </button>
        </section>
      </header>
      <main className="relative mb-4 top-20">
        <section className="mx-4 p-4 rounded-lg" ref={formRef}>
          <form>
            <InputText
              name="title"
              title="Title"
              register={() => {}}
              ref={titleRef}
            />
            <InputText name="body" title="Body" register={() => {}} />
            <section className="flex flex-col lg:flex-row">
              <section className="grow lg:mr-10">
                <InputText
                  name="category"
                  title="Category"
                  register={() => {}}
                />
              </section>
              <ButtonPrimary small>Create Thread</ButtonPrimary>
            </section>
          </form>
        </section>
        <section className="overflow-y-auto">
          {threads.map((thread) => (
            <ThreadItems
              key={thread.id}
              title={thread.title}
              body={thread.body}
              category={thread.category}
              createdAt={thread.createdAt}
              owner={users.find((user) => user.id === thread.ownerId)}
              upVotesBy={thread.upVotesBy}
              downVotesBy={thread.downVotesBy}
              totalComments={thread.totalComments}
            />
          ))}
        </section>
        <button
          type="button"
          className={`${
            isShowCreate ? "opacity-100" : "opacity-0"
          } fixed bottom-4 right-4 transition-opacity rounded-lg text-5xl text-white bg-primary w-12 lg:w-14 h-12 lg:h-14 grid place-items-center`}
          onClick={onScrollToTop}
        >
          +
        </button>
      </main>
    </>
  );
}

export default HomePage;
