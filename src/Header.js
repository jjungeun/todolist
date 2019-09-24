import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to={'/'}>글 목록</Link>
          </li>
          <li>
            <Link to={'/create'}>글 등록하기</Link>
          </li>
          <li>
            <Link to={'/update'}>글 수정하기</Link>
          </li>
          <li>
            <Link to={'/delete'}>글 지우기</Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default Header