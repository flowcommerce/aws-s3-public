(function () {
  const postingsURL = 'https://api.lever.co/v0/postings/flow?mode=json';
  const leverContainer = document.getElementById('lever-postings');

  const styles = `
  .lever-postings .lever-department-name {
      margin: 1rem 0;
  }
  .lever-postings .lever-team-name {
      margin-top: 0;
      margin-bottom: 1rem
  }
  .lever-postings .lever-posting {
      margin: 1rem 0;
  }
  .lever-postings .role-name {
      display: block;
      font-size: 18px;
      line-height: 20px;
      font-family: "FreightSans Pro";
      font-weight: 500;
      letter-spacing: 0px;
      font-style: normal;
      color: rgb(34, 34, 34);
      text-align: inherit;
      transition: none 0s ease 0s;
      border-width: 0px;
      padding: 0px;
  }
  .lever-postings .role-name {

  }
  .lever-postings .role-subtext {
      color: #999;
      display: block;
      font-size: 16px;
  }
  .lever-postings .view-posting {
      display: block;
  }
  `;

  function domContentLoaded(callback) {
    if (document.readyState !== "loading") {
      callback();
    } else {
      document.addEventListener("DOMContentLoaded", callback);
    }
  }

  function toSlug(str) {
      const lower = str.toLowerCase();
      return str.replace(/\s/g, '-');
  }

  function injectStyles() {
      const style = document.createElement('style');
      const head = document.head || document.getElementsByTagName('head')[0];
      style.type = 'text/css';
      style.appendChild(document.createTextNode(styles));
      head.appendChild(style);
  }

  function getPostingHTML(posting) {
      const postingDiv = document.createElement('div');
      postingDiv.className = 'lever-posting';
      postingDiv.id = posting.id;
      postingDiv.innerHTML = `
      <span class="role-name">${posting.text}</span>
      <span class="role-subtext">${posting.categories.location} - ${posting.categories.department} - ${posting.categories.team} - ${posting.categories.commitment}</span>
      <span class="view-posting"><a href="${posting.hostedUrl}">View Posting</a></span>
      `;
      return postingDiv;
  }

  function getDepartmentHTML(department, postings) {
      const container = document.createElement('div');
      container.className = 'lever-department';
      container.innerHTML = `<h2 class="lever-department-name lever-department-${toSlug(department)}">${department}</h2>`;
      return container;
  }

  function getTeamHTML(team, departmentDiv, postings) {
      const container = document.createElement('div');
      container.className = 'lever-team';
      container.innerHTML = `<h3 class="lever-team-name lever-team-${toSlug(team)}">${team}</h3>`;
      return container;
  }

  function getDepartments(postings) {
     return postings.reduce(function (result, current) {
          const department = current.categories.department;
          if (!result.includes(department)) {
              result.push(department);
              return result;
          }
          return result;
      }, []);
  }

  function getTeamsByDepartment(department, postings) {
      return postings.reduce(function (result, current) {
          const currentDepartment = current.categories.department;
          const team = current.categories.team;
          if (currentDepartment === department && !result.includes(team)) {
              result.push(team);
              return result;
          }
          return result;
      }, []);
  }

  function getPostingsByTeamAndDepartment(department, team, postings) {
      return postings.filter(function (posting) {
          const postingDepartment = posting.categories.department;
          const postingTeam = posting.categories.team;

          return postingDepartment === department && postingTeam === team;
      });
  }

  function fetchPostings() {
      fetch(postingsURL)
          .then(function (response) { return response.json(); })
          .then(function (postings) {
              const departments = getDepartments(postings);
              departments.forEach((function (department) {
                  const departmentDiv = getDepartmentHTML(department, postings);
                  const teams = getTeamsByDepartment(department, postings);
                  teams.forEach(function (team) {
                      const teamDiv = getTeamHTML(team, departmentDiv, postings);
                      const teamPostings = getPostingsByTeamAndDepartment(department, team, postings);
                      teamPostings.forEach(function (posting) {
                          const postingDiv = getPostingHTML(posting);
                          teamDiv.appendChild(postingDiv);
                      });
                      departmentDiv.appendChild(teamDiv);
                  });
                  leverContainer.appendChild(departmentDiv);

              }));
          });
  }

  domContentLoaded(function () {
    injectStyles();
    fetchPostings();
  });
}());
