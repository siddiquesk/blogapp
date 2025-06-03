import React from 'react'

function About() {
  return (
    <>
      <div className="container mx-auto my-10 p-4 space-y-9">
        <h1 className="text-2xl font-bold mb-6">About</h1>
        <p>
          This is{" "}
          <strong className="text-blue-800 font-semibold hover:scale-105 duration-500">
            Sufiyan
          </strong>{" "}
          a proficient full stack developer with a robust skill set spanning both
          front-end and back-end technologies. With a passion for building
          dynamic, responsive, and user-friendly web applications, Akhil excels in
          crafting seamless digital experiences.
        </p>
        <h2 className="font-semibold text-blue-800 text-xl">
          Technical Expertise:
        </h2>
        <p>
          Front-End: Adept in modern JavaScript frameworks and libraries such as
          React.js, Angular, and Vue.js. Skilled in HTML5, CSS3, and responsive
          design principles to create intuitive and visually appealing interfaces.
          Back-End: Proficient in server-side technologies including Node.js,
          Express.js, and Django. Experienced with database management using SQL
          and NoSQL databases like MySQL, PostgreSQL, and MongoDB. DevOps:
          Knowledgeable in containerization and orchestration tools such as Docker
          and Kubernetes. Familiar with continuous integration and deployment
          (CI/CD) pipelines. Cloud Services: Experience with cloud platforms like
          AWS, Azure, and Google Cloud, enabling scalable and reliable application
          deployment.
        </p>
        <h2 className="font-semibold text-blue-800 text-xl">
          Professional Highlights:
        </h2>
        <p>
          Successfully developed and deployed numerous full-stack applications,
          demonstrating strong problem-solving skills and a keen eye for detail.
          Collaborated with cross-functional teams to deliver high-quality
          software solutions within tight deadlines. Continuously learning and
          adapting to emerging technologies and industry trends to stay ahead in
          the fast-evolving tech landscape.
        </p>
        <br />
        <span>
          Akhil K is dedicated to leveraging his expertise to contribute to
          innovative projects and drive technological advancements. Whether
          working on front-end interfaces or back-end logic, he is passionate
          about delivering exceptional digital solutions that meet user needs and
          exceed client expectations.
        </span>
        <h2 className="font-semibold text-blue-800 text-xl">
          Personal Interests and Inspiration:
        </h2>
        <p>
          I’m a huge fan of cricket and deeply admire <strong>King Kohli</strong>. I'm not just a strong competitor but also a loyal friend. I always try to motivate myself to push his limits and strive for excellence.
        </p>

      </div>
    </>
  )
}

export default About
