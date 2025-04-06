const Aside = () => {
  return (
    <aside className="text-lg flex flex-col mr-7 gap-10 relative justify-center items-end">
      <article className="flex flex-col gap-8 justify-end w-90 break-words">
        <div>
          <p className="text-4xl mb-1">성장에 목마른 개발자</p>
          <p className="opacity-90">Impossible is nothing</p>
        </div>
        <div>
          <p className="mb-1 opacity-90">Growth</p>
          <p>I am the most thirsty for growth than anyone else</p>
        </div>
        <div>
          <p className="mb-1 opacity-90">Challenge</p>
          <p>
            They are not afraid of challenges <br />
            but rather enjoy them.
          </p>
        </div>
        <div>
          <p className="mb-1 opacity-90">Passion</p>
          <p>I&apos;m always on fire with hot passion.</p>
        </div>
      </article>
    </aside>
  );
};

export const HtmlContent = () => {
  return (
    <>
      <section>
        <article>
          <p className="flex flex-col justify-center">
            Hi
            <br />
            There
            <br />
            I&apos;m
            <br />
            Jaeyeop
          </p>
        </article>
      </section>
      <Aside />
    </>
  );
};
