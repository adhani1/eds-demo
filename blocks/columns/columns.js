export default async function  decorate(block) {
  const perPage=20;
 const response=await fetch(`http://localhost:3000/customblocks.json?limit=${perPage}`)
  const content =await response.json()
    // Create the pagination container dynamically
    const blockContent = document.createElement('div');
    blockContent.id = 'block-container';  // Set the id dynamically
    block.appendChild(blockContent);
  content.data.forEach(element => {
    const dynamicdiv=document.createElement('div')
    dynamicdiv.classList.add('column-wrapper')
    dynamicdiv.textContent=`${element.Name} : ${element.Content}`
    blockContent.appendChild(dynamicdiv)
    block.appendChild(blockContent)
  });
  
  const totalPages = content.total/perPage;  // Total number of pages
  let currentPage = 1;  // Current page

  // Create the pagination container dynamically
  const paginationContainer = document.createElement('div');
  paginationContainer.id = 'pagination-container';  // Set the id dynamically
  block.appendChild(paginationContainer);  // Append the container to the body (or any other desired parent)

  // Create pagination div
  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('pagination');

  // Create "Previous" button
  const prevButton = document.createElement('a');
  prevButton.href = '#';
  prevButton.classList.add('prev');
  prevButton.innerText = '« Previous';
  prevButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (currentPage > 1) updatePagination(currentPage - 1);
  });
  paginationDiv.appendChild(prevButton);

  // Create page links
  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement('a');
    pageLink.href = '#';
    pageLink.innerText = i;
    pageLink.classList.add('page');
    if (i === currentPage) pageLink.classList.add('active');
    pageLink.addEventListener('click', function (e) {
      e.preventDefault();
      updatePagination(i);
    });
    paginationDiv.appendChild(pageLink);
  }

  // Create "Next" button
  const nextButton = document.createElement('a');
  nextButton.href = '#';
  nextButton.classList.add('next');
  nextButton.innerText = 'Next »';
  nextButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (currentPage < totalPages) updatePagination(currentPage + 1);
  });
  paginationDiv.appendChild(nextButton);

  // Append the pagination div to the dynamically created container
  paginationContainer.appendChild(paginationDiv);

  // Function to update pagination links and handle current page
  async function updatePagination(newPage) {
    blockContent.innerHTML=""
    const res=await fetch(`http://localhost:3000/customblocks.json?limit=${perPage}&offset=${(newPage-1)*perPage}`)
    const cont =await res.json()
    cont.data.forEach(element => {
      const dynamicdiv=document.createElement('div')
      dynamicdiv.classList.add('column-wrapper')
      dynamicdiv.textContent=`${element.Name} : ${element.Content}`
      blockContent.appendChild(dynamicdiv)
    });


    currentPage = newPage;
    paginationContainer.innerHTML = '';  // Clear the current pagination
    paginationContainer.appendChild(paginationDiv);  // Re-append updated pagination
    updateButtonsState();  // Update the state of "Previous" and "Next" buttons
  }

  // Function to update the "Previous" and "Next" button states
  function updateButtonsState() {
    // Handle "Previous" button state
    const prevButton = paginationDiv.querySelector('.prev');
    if (currentPage === 1) {
      prevButton.classList.add('disabled');
    } else {
      prevButton.classList.remove('disabled');
    }

    // Handle "Next" button state
    const nextButton = paginationDiv.querySelector('.next');
    if (currentPage === totalPages) {
      nextButton.classList.add('disabled');
    } else {
      nextButton.classList.remove('disabled');
    }

    // Handle active page styling
    const pageLinks = paginationDiv.querySelectorAll('.page');
    pageLinks.forEach(link => {
      link.classList.remove('active');
      if (parseInt(link.innerText) === currentPage) {
        link.classList.add('active');
      }
    });
  }

  // Initialize the buttons state
  updateButtonsState();



  // const cols = [...block.firstElementChild.children];
  // block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  // [...block.children].forEach((row) => {
  //   [...row.children].forEach((col) => {
  //     const pic = col.querySelector('picture');
  //     if (pic) {
  //       const picWrapper = pic.closest('div');
  //       if (picWrapper && picWrapper.children.length === 1) {
  //         // picture is only content in column
  //         picWrapper.classList.add('columns-img-col');
  //       }
  //     }
  //   });
  // });
}
