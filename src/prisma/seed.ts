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
      html: '',
      css: '',
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

  // for (let template of templates) {
  //   await prisma.template.create({
  //     data: template
  //   })
  // }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  }).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })