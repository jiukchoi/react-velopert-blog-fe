import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef, useEffect } from 'react';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';

const EditorBlock = styled(Responsive)`
  width: 100%;
  padding: 5rem 0;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 2rem;
  width: 100%;
`;

const Editor = ({ title, body, onChangeField }) => {
  const onChangeBody = content => {
    onChangeField({ key: 'body', value: content });
  };

  const onChangeTitle = e => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    onChangeField({ key: 'body', value: body });
  }, [body, onChangeField]);

  return (
    <EditorBlock>
      <TitleInput
        placeholder="제목을 입력하세요"
        onChange={onChangeTitle}
        value={title}
      />
      <ReactQuill
        theme="snow"
        value={body}
        onChange={onChangeBody}
        style={{ height: 300 }}
      ></ReactQuill>
    </EditorBlock>
  );
};

export default Editor;
