import React, { useEffect, useState } from "react";
import {
  useWorkoutDispatch,
  useWorkoutState,
} from "../contexts/workout/WorkoutContext";
import { v4 as uuidv4 } from "uuid";
import Button from "./Button";
import Input from "./Input";

function WorkoutScheme() {
  const { exercises } = useWorkoutState();

  const dispatch = useWorkoutDispatch();

  if (!Object.values(exercises).length) {
    return <div>Add some exercises</div>;
  }

  return Object.entries(exercises).map(
    ([exerciseId, { exerciseName, sets }]) => (
      <section key={exerciseId}>
        <div className="mb-6" key={exerciseId}>
          <div className="flex space-x-2 items-baseline">
            <h3 className="text-lg mb-4">{exerciseName}</h3>
            <Button
              icon="remove"
              action={() =>
                dispatch({
                  type: "REMOVE_EXERCISE",
                  payload: exerciseId,
                })
              }
            />
          </div>
          <div className="flex space-x-4 mb-2">
            <div className="w-12">Set</div>
            <div className="w-32">Kg</div>
            <div className="w-32">Reps</div>
            <div className="w-34"></div>
          </div>
          {Object.values(sets).length &&
            Object.entries(sets).map(
              ([setId, { weight, reps, isFinished }]) => (
                <div
                  className={`${
                    isFinished && "bg-green-50"
                  } flex space-x-4 py-2`}
                  key={setId}
                >
                  <div className="w-12 flex items-center justify-center">
                    nr
                  </div>
                  <div className="w-32">
                    <Input
                      center
                      value={weight}
                      handleChange={(e) =>
                        dispatch({
                          type: "UPDATE_WEIGHT",
                          payload: {
                            exerciseId,
                            setId,
                            newWeight: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="w-32">
                    <Input
                      center
                      value={reps}
                      handleChange={(e) =>
                        dispatch({
                          type: "UPDATE_REPS",
                          payload: {
                            exerciseId,
                            setId,
                            newReps: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="w-34 flex items-center justify-center space-x-2">
                    <Button
                      variant="secondary"
                      icon="remove"
                      action={() =>
                        dispatch({
                          type: "REMOVE_SET",
                          payload: {
                            exerciseId,
                            setId,
                          },
                        })
                      }
                    />

                    <Button
                      icon="check"
                      variant={isFinished ? "primary" : "secondary"}
                      action={() =>
                        dispatch({
                          type: "TOGGLE_FINISHED",
                          payload: {
                            exerciseId,
                            setId,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              )
            )}
          <Button
            value="Add set"
            variant="primary"
            icon="plus"
            action={() =>
              dispatch({
                type: "ADD_SET",
                payload: {
                  exerciseId,
                  setId: uuidv4(),
                },
              })
            }
          />
        </div>
      </section>
    )
  );
}

export default WorkoutScheme;
