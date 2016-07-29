let Body = React.createClass({
  getInitialState() {
    return { skills: [] }
  },
  
  handleDelete(id) {
    $.ajax({
      url: `/api/v1/skills/${id}`,
      type: 'DELETE',
      success: () => {
        this.removeSkillFromDOM(id);
      }
    });
  },

  removeSkillFromDOM(id) {
    let newSkills = this.state.skills.filter((skill) => {
      return skill.id != id;
    });

    this.setState({ skills: newSkills });
  },

  componentDidMount() {
    $.getJSON('/api/v1/skills.json', (response) => { this.setState({ skills: response }) });
  },

  handleSubmit(skill) {
    let newState = this.state.skills.concat(skill);
    this.setState({ skills: newState })
  },

  handleUpdate(skill) {
    $.ajax({
      url: `/api/v1/skills/${skill.id}`,
      type: 'PUT',
      data: { skill: skill },
      success: (skill) => {
        this.updateSkills(skill)
      }
    });
  },
  
  updateSkills(skill) {
    let skills = this.state.skills.filter((s) => { return s.id != skill.id });
    skills.push(skill);

    this.setState({ skills: skills });
  },

  render() {
    return (
      <div>
        <NewSkill handleSubmit={this.handleSubmit} />
        <AllSkills skills={this.state.skills} 
                   handleDelete={this.handleDelete}
                   handleUpdate={this.handleUpdate} />
      </div>
    )
  }
});