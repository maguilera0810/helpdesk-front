import React, { useEffect, useState } from 'react';

// import { Button, Paper } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import { useCategory } from '../../../../hooks/useCategory';
import categoryStore from '../../../../stores/categoryStore';




const CategoryRelations: React.FC = () => {
  const category = categoryStore((state) => state.category);
  const {  updateCategory, fetchCategories } = useCategory();
  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const categoryId = parseInt(id);
    // await updateCategory(categoryId, formData);
    // navigate('/admin/users');
  };

  useEffect(() => {
    category && fetchCategories({ "excl_id": category.id });
    console.log(category);
  }, [category]);

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel1-header"
        >
          <Typography>Skills</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Type 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default CategoryRelations;