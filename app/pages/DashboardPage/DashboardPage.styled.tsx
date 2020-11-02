import styled from '@emotion/styled'

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
`

export const Title = styled.p`
  font-weight: 700;
  margin: 0;
  margin-bottom: 24px;
`

export const ComingLessonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  flex: 1;
  overflow: auto;
`

export const EventInfoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f5f9fd;
  overflow: auto;
`

export const EventsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

export const EventItemWrapper = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

export const EventItemButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  display: flex;
  background: #f3f5f8;
  border-radius: 16px;
  padding: 20px;
`

export const EventItemColor = styled.div<{ color: string }>`
  width: 8px;
  height: 45px;
  background: ${({ color }) => color};
  margin-right: 16px;
  border-radius: 5px;
`

export const EventInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const EventItemTime = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 14px;
  color: #405775;
`

export const EventItemName = styled.p`
  margin: 0;
  font-weight: 900;
  font-size: 18px;
  color: #405775;
`
