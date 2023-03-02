import React from 'react';
import { client } from '../../lib/client';
import { Subcategory } from '../../components';

const SubCategories = ({ category: { name }, subCategory }) => {
  return (
    <div>
      <div className="subcategory-heading">
      <h1>{name}</h1>
    </div>
      <div className='subcategory-container'>

        {subCategory?.map((subCat) => <Subcategory key={subCat._id} subcategory={subCat} />)}

      </div>
    </div>
  )
}


export const getStaticPaths = async () => {
  const query = `*[_type == "categories"] {
      slug {
        current
      }
    }
    `;

  const categories = await client.fetch(query);

  const paths = categories.map((category) => ({
    params: {
      slug: category.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "categories" && slug.current == '${slug}'][0]`;
  const category = await client.fetch(query);


  const subCat = `*[_type == "subcategory" && category->name == "${category.name}"]`;
  const subCats = `*[_type == "subcategory"]`;

  const subCategory = await client.fetch(subCat);
  const subCategories = await client.fetch(subCats);

  return {
    props: { category, subCategory, subCategories }
  }
}


export default SubCategories

