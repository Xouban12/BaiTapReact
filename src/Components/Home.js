import React from 'react';
import styled from 'styled-components';
import { Add } from './Add';
import Search from './Search';
import DocList from './DocList';

const data = [
  { id: 1, name: 'Trên đường băng', isComplete: true },
  { id: 2, name: 'Cà phê cùng Tony', isComplete: false },
];
class Home extends React.Component {
  state = {
    data: data,
  };
  setCompleted = (id) => {
    var doc = this.state.data.find((doc) => doc.id === id);
    var docList = this.state.data.filter((doc) => doc.id !== id);
    var newdoc = {
      id: doc.id,
      name: doc.name,
      isComplete: !doc.isComplete,
    };
    this.setState({ data: [...docList, newdoc] });
    console.log('set complete', newdoc);
  };
  add = (name) => {
    var newdoc = {
      id: new Date().getMilliseconds(),
      name: name,
      isComplete: false,
      isTrash: false,
    };
    this.state.data.push(newdoc);
    this.setState(this.state.data);
    console.log('add', this.state.data);
  };
  edit = (title, id) => {
    var list = this.state.data;
    let arr = list.filter((doc) => doc.id === id);
    arr.map((doc) => {
      doc.title = title;
    });
    // console.log(list);
    this.setState({ data: list });
  };

  render() {
    const docList = this.state.data.filter((i) => !i.isComplete);
    const docListComplete = this.state.data.filter((doc) => doc.isComplete);
    return (
      <>
        <Search> </Search> <Add add={this.add}> </Add>
        <HomeWrapper>
          <DocList
            text='Sách đang đọc'
            docs={docList}
            setCompleted={this.setCompleted}
            editdoc={this.edit}
          ></DocList>
          <DocList
            text='Sách đã đọc'
            completed
            docs={docListComplete}
            setCompleted={this.setCompleted}
            editdoc={this.edit}
          ></DocList>
        </HomeWrapper>
      </>
    );
  }
}
export default Home;

const HomeWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  margin: 1.5rem 0;
`;
