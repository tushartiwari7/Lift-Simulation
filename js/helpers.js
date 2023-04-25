export const LIFT_STATUS = {
  AVAILABLE: "available",
  BUSY: "busy",
  FULL: "full",
};
export const LIFT_DIRECTION = {
  UP: "UP",
  BOTTOM: "BOTTOM",
};

export const FLOOR_HEIGHT = 161; // px
export const HALT_PER_FLOOR = 2000; // ms
export const FLOOR_GAP = 2; //px
export const isFloorFallsInPath = (lift, requestedAt) => {
  /**
   *  Check lift's direction and curr pos,
   * 	if my floor > curr pos and direction is up return true.
   * 	if my floor < curr pos and direction is bottom return true.
   * 	else return false
   */
  if (
    requestedAt.floor_no > Number(lift.dataset.pos) &&
    lift.dataset.direction === LIFT_DIRECTION.UP
  )
    return true;

  if (
    requestedAt.floor_no < Number(lift.dataset.pos) &&
    lift.dataset.direction === LIFT_DIRECTION.BOTTOM
  )
    return true;
  return false;
};

export const sortFloors = (str) => {
  const queue = Array.from(str)
    .reduce((acc, curr) => {
      if (curr === ",") return acc;
      return [...acc, Number(curr)];
    }, [])
    .sort((a, b) => a - b);
  return queue;
};

export const isClosestReducer = (floor_no) => {
  return (closestLift, lift) => {
    // if lift is busy and going in direction opposite of my current position ignore it.
    if (
      lift.dataset.status === LIFT_STATUS.BUSY &&
      isOppositeDirection(lift, floor_no)
    )
      return closestLift;
    // distance btwin floor and currentLift
    const distance = Math.abs(floor_no - Number(lift.dataset.pos));
    if (distance < closestLift.distance)
      return { ...closestLift, ref: lift, distance };
    return closestLift;
  };
};

const isOppositeDirection = (lift, floor_no) => {
  const needToGoUp = floor_no - Number(lift.dataset.pos) > 0;
  if (needToGoUp && lift.dataset.direction === LIFT_DIRECTION.UP) return false;
  if (!needToGoUp && lift.dataset.direction === LIFT_DIRECTION.BOTTOM)
    return false;
  return true;
};

export const getDestination = (queue, liftData) => {
  /**
   * Returns the extreme floor of the Lifts that's in the queue and in the lift's moving direction.
   */
  const destination =
    liftData.direction === LIFT_DIRECTION.UP &&
    Number(liftData.pos) !== Math.max(...queue)
      ? Math.max(...queue)
      : Math.min(...queue);
  return destination;
};

export const toggleControls = (floor_no, enable = true) => {
  const floors = document.getElementsByClassName("controls");
  const floor = [...floors].find(
    (floor) => floor_no === Number(floor.parentElement.dataset.floorNo)
  );
  floor.dataset.disabled = enable;
};

export const arrowDown = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="2rem" width="2rem" xmlns="http://www.w3.org/2000/svg" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" style="--darkreader-inline-fill:currentColor; --darkreader-inline-stroke:currentColor;"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"></path></svg>`;

export const arrowUp = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="2rem" width="2rem" xmlns="http://www.w3.org/2000/svg" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" style="--darkreader-inline-fill:currentColor; --darkreader-inline-stroke:currentColor;"><path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"></path></svg>`;
