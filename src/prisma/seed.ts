import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'teste@teste.com' },
    update: {},
    create: {
      email: 'teste@teste.com',
      name: 'Lucas batista',
      password: 'teste123'
    }
  })

  const templateCategories = [
    {
      id: 1,
      name: 'Pagina de vendas',
    },
    {
      id: 2,
      name: 'Pagina de obrigado',
    },
    {
      id: 3,
      name: 'Teste',
    },
  ]

  const templates = [
    {
      title: 'Template 1',
      description: 'Template 1',
      html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <link rel="stylesheet" href="./index.css" />
        </head>
        <body>
          <header>
            <img src="https://lp.mentorfy.io/img/logo-3.png" alt="Logo" />
            <div>
              <a href="#funcionalidades">Funcionalidades</a>
            </div>
            <button class="btn-primary">Entrar</button>
          </header>
      
          <main>
            <section class="hero">
              <div class="content">
                <h1 class="text-center">
                  A primeira Área de membros 100% focada em <br />
                  processos de mentorias com experiência Premium
                </h1>
                <h2 class="text-center orange">
                  Somos o ápice da elegância na criação e gestão de mentorias
                </h2>
                <h3 class="text-center">
                  Tudo que você precisa para vender sua mentoria sem receio de perder
                  o controle e a <br />
                  excelência na gestão e no processo de entrega
                </h3>
      
                <button class="btn-primary mx-auto">Entrar</button>
              </div>
            </section>
      
            <section>
              <div class="content">
                <img
                  src="https://lp.mentorfy.io/img/laptop-3.png"
                  class="w-full hero-img"
                />
              </div>
            </section>
      
            <section>
                <h1 class="text-center">
                  Empresas e líderes de <br />
                  destaque utilizam a Mentorfy
                </h1>
      
                <h3 class="orange italic text-center mt-4">
                  A Mentorfy é uma plataforma tão flexível que se ajusta perfeitamente
                  a
                  <br />
                  diversos modelos de negócios baseados em educação.
                </h3>
      
                <div class="companies">
                  <img
                    src="https://lp.mentorfy.io/_next/image?url=%2Fimg%2Flogos%2Fimg%20(1).png&w=256&q=75"
                  />
                  <img
                    src="https://lp.mentorfy.io/_next/image?url=%2Fimg%2Flogos%2Fimg%20(2).png&w=256&q=75"
                  />
                  <img
                    src="https://lp.mentorfy.io/_next/image?url=%2Fimg%2Flogos%2Fimg%20(3).png&w=256&q=75"
                  />
                  <img
                    src="https://lp.mentorfy.io/_next/image?url=%2Fimg%2Flogos%2Fimg%20(4).png&w=256&q=75"
                  />
                  <img
                    src="https://lp.mentorfy.io/_next/image?url=%2Fimg%2Flogos%2Fimg%20(5).png&w=256&q=75"
                  />
                  <img
                    src="https://lp.mentorfy.io/_next/image?url=%2Fimg%2Flogos%2Fimg%20(6).png&w=256&q=75"
                  />
                </div>
            </section>
      
            <section class="sided mt-12">
              <div class="content">
                <div class="left">
                  <h1>Área de mentorias exclusivas!</h1>
                  <h2>
                    O jeito mais <span class="orange">escalável</span> de se entregar
                    Mentorias!
                  </h2>
      
                  <h3 class="orange italic">
                    Inovamos a forma de se entregar mentorias, com escala e
                    previsibilidade para que você mentor preocupe-se apenas em gerar
                    soluções e boas ideias.
                  </h3>
      
                  <button href="" class="btn-primary">Teste gratuitamente</button>
                </div>
                <div class="right">
                  <img src="https://lp.mentorfy.io/img/mountain-tablet.png" alt="" />
                </div>
              </div>
            </section>
          </main>
      
          <footer class="text-center">
            <img src="https://lp.mentorfy.io/img/logo-3.png" alt="Logo">
          </footer>
        </body>
      </html>
      `,
      css: `
      @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap');

:root {
  --sm: 12px;
  --md: 24px;
  --lg: 36px;

  --orange: orange;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #fff;

  font-family: 'Sora', sans-serif;
}

main,
header,
footer {
  background: #000;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--sm) var(--md);
}

footer {
  padding-bottom: 32px;
}

button {
  background: none;
  border: none;
}

section {
  width: 100%;
  padding: 0 24px;
}

section .content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.orange {
  color: var(--orange);
}

.italic {
  font-style: italic;
}

.mt-4 {
  margin-top: 12px;
}

.mt-12 {
  margin-top: 144px;
}

.w-full {
  width: 100%;
}

.text-center {
  text-align: center;
}

.mx-auto {
  margin: 0 auto;
}

.companies {
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  padding: 12px 24px;
  gap: 24px;
}

.btn-primary {
  padding: var(--sm) var(--md);
  border: 2px solid var(--orange);
  text-align: center;
  width: fit-content;
}

.hero {
  padding-top: var(--md);
  gap: 12px;
  display: flex;
  flex-direction: column;
}

.hero h3 {
  margin-bottom: 20px;
}

.hero-img {
  width: 100%;
}

h1 {
  font-size: 36px;
  line-height: 38px;
}

h2 {
  font-size: 24px;
  line-height: 28px;
}

h3 {
  font-size: 18px;
  line-height: 20px;
}

section.sided .content {
  display: flex;
  align-items: center;
}

section.sided h3 {
  margin: 24px 0 36px;
}

section.sided .left {
  width: 50%;
  text-align: left;
}

section.sided .right {
  width: 50%;
}

section.sided img {
  width: 100%;
}
      `,
      templatePreview: 'https://placehold.it/1024x1024',
      categoryId: 1
    },
    {
      title: 'Template 2',
      description: 'Template 2',
      html: '',
      css: '',
      templatePreview: 'https://placehold.it/1024x1024',
      categoryId: 2
    },
    {
      title: 'Template 3',
      description: 'Template 3',
      html: '',
      css: '',
      templatePreview: 'https://placehold.it/1024x1024',
      categoryId: 3
    }
  ];

  // const websites = [
  //   {
  //     title: 'test',
  //     domain: 'https://www.test.com.br',
  //     userId: 1,
  //     status: "ACTIVE"
  //   }
  // ]

  // for (let website of websites) {
  await prisma.website.create({
    data: {
      title: 'test',
      domain: 'https://www.test.com.br',
      userId: 1,
      status: "ACTIVE"
    }
  })
  // }

  for (let templateCat of templateCategories) {
    await prisma.templateCategory.create({
      data: templateCat
    })
  }

  for (let template of templates) {
    await prisma.template.create({
      data: template
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  }).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })