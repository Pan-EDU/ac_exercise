const BASE_URL = 'https://lighthouse-user-api.herokuapp.com/api/v1/users/'
const MemberPanel = document.querySelector('#member-panel')
const Pagination = document.querySelector('#pagination')
const MemberPerPage = 8
let currentPage = 1

const MemberList = []

function renderMemberList(data) {
  let rawHTML = ''
  data.forEach(item => {
    rawHTML += `<div class="col-sm-3">
      <div class="mb-2">
        <div class="card text-white bg-dark ">
          <img src="${item.avatar}" class="card-img-top">
          <div class="card-body text-center">
            <h5 class="card-title">${item.name + " " + item.surname}</h5>
            <button type="button" class="btn btn-success btn-info btn-data" data-toggle="modal" data-target="#info-modal" data-id="${item.id}">Info</button>
            <button type="button" class="btn btn-outline-danger btn-vip" data-id="${item.id}">★</button>
          </div>
        </div>
      </div>
    </div>`
  })
  MemberPanel.innerHTML = rawHTML
}

function ShowInfoModal(ID) {
  const InfoTitle = document.querySelector('#info-title')
  const InfoBody = document.querySelector('#info-body')
  axios
    .get(BASE_URL + ID)
    .then(response => {
      const Data = response.data
      InfoTitle.innerText = Data.name + " " + Data.surname
      InfoBody.innerHTML = `<p> Birth Day: ${Data.birthday}<br> Email: ${Data.email}<br> Gender: ${Data.gender}</p>`
      $('#info-modal').modal('toggle')
    })
}

MemberPanel.addEventListener('click', function launchModal(event) {
  if (event.target.matches('.btn-data')) {
    const ID = event.target.dataset.id
    ShowInfoModal(ID)
  } else if (event.target.matches('.btn-vip')) {
    const Btn = $(event.target)
    if (event.target.matches('.btn-outline-danger')) {
      Btn.removeClass("btn-outline-danger").addClass("btn-danger")
    } else {
      Btn.removeClass("btn-danger").addClass("btn-outline-danger")
    }
  }
})

function renderPagination(data) {
  const TotalPageNum = Math.ceil(data.length / MemberPerPage)
  let rawHTML = ``
  for (let i = 1; i < TotalPageNum + 1; i++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="javascript:;" data-page=${i}>${i}</a></li>`
  }
  Pagination.innerHTML = rawHTML
}


function getMemberByPage(data, page) {
  const Start = (page - 1) * MemberPerPage + 1
  return data.slice(Start, Start + MemberPerPage)
}

Pagination.addEventListener('click', function ShowPageData(event) {
  if (event.target.tagName !== 'A') return
  const Page = event.target.dataset.page
  renderMemberList(getMemberByPage(MemberList, Page))
})

axios
  .get(BASE_URL)
  .then(response => {
    MemberList.push(...response.data.results)
    renderPagination(MemberList)
    renderMemberList(getMemberByPage(MemberList, 1))
  })