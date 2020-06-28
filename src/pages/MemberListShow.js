import React, { useState, useEffect } from 'react'
import { Table, Container, Row, Col, ListGroup, Image } from 'react-bootstrap'
import MemberSideLink from './MemberSideLink'
import MemberItem from './MemberItem'
import MemberEditForm from './MemberEditForm'

function MemberListShow(props) {
  const {
    member,
    setMember,
    isedit,
    setIsedit,
    handleEditedSave,
    ischangepwd,
    setIschangepwd,
    handleImgSave,
    localMember,
  } = props
  return (
    <>
      <MemberSideLink>
        {isedit ? (
          <MemberEditForm
            member={member}
            setMember={setMember}
            isedit={isedit}
            setIsedit={setIsedit}
            handleEditedSave={handleEditedSave}
            handleImgSave={handleImgSave}
            localMember={localMember}
          />
        ) : (
          <MemberItem
            member={member}
            isedit={isedit}
            setIsedit={setIsedit}
            ischangepwd={ischangepwd}
            setIschangepwd={setIschangepwd}
          />
        )}
      </MemberSideLink>
    </>
  )
}
export default MemberListShow
